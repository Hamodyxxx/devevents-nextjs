import { AppError, BadRequestError, NotFoundError } from "@/lib/errors/app-error";
import dbConnect from "@/lib/mongo";
import { tryCatch, tryCatchSync } from "@/lib/try-catch";
import { v2 } from "cloudinary";
import { uploadImageToCloudinaryService } from "./image.service";
import { createEvent, CreateEventInputSchema, getEventBySlug, listEvents, type EventDto } from "@/data-access";

export async function createEventService(
    eventData: FormData
) {
    await dbConnect();

    const {data: event, error} = tryCatchSync(() => Object.fromEntries(eventData));
    if(error) throw new BadRequestError("Invalid JSON data format");

    const file = eventData.get('image') as File;
    if(!file) throw new BadRequestError('image is required');

    const tags = JSON.parse((eventData.get("tags") as string) || "[]") || [];
    const agenda = JSON.parse((eventData.get("agenda") as string) || "[]") || [];

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadImageToCloudinaryService(buffer);

    event.image = uploadResult.secure_url;

    const parsed = CreateEventInputSchema.safeParse({
        ...(event as Record<string, unknown>),
        tags,
        agenda,
    });

    if (!parsed.success) {
        await tryCatch(v2.uploader.destroy(uploadResult.public_id));
        throw new BadRequestError("Invalid event payload");
    }

    const createdEventResult = await tryCatch(createEvent(parsed.data));

    if(createdEventResult.error) {
        await tryCatch(v2.uploader.destroy(uploadResult.public_id));
        throw createdEventResult.error;
    };

    return createdEventResult.data;
}

export async function getAllEventsService() {
    await dbConnect();

    const eventsRes = await tryCatch(listEvents({}));

    if(eventsRes.error) throw new AppError("Failed to fetch events", 500);

    return eventsRes.data;
}

export async function getEventBySlugService(slug: string) {
    await dbConnect();

    const eventsRes = await tryCatch(getEventBySlug(slug));

    if(eventsRes.error) throw eventsRes.error;      
    if(!eventsRes.data) throw new NotFoundError("There is no Event with this Slug");

    return eventsRes.data;
}

export async function getSimilarEventsBySlugService(slug: string): Promise<EventDto[]> {
    await dbConnect();
    const event = await getEventBySlugService(slug);

    // Similarity query needs a flexible filter; keep it in DAL but pass raw mongo filter.
    const similarEventsRes = await tryCatch(
        listEvents({
            _id: { $ne: event.id },
            tags: { $in: event.tags },
        })
    );

    if(similarEventsRes.error) return [];
    if(!similarEventsRes.data) return [];

    return similarEventsRes.data;
}