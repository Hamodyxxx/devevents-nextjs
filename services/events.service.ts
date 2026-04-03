import { AppError, BadRequestError, NotFoundError } from "@/lib/errors/app-error";
import dbConnect from "@/lib/mongo";
import { tryCatch, tryCatchSync } from "@/lib/try-catch";
import { v2 } from "cloudinary";
import { uploadImageToCloudinaryService } from "./image.service";
import { createEvent, CreateEventInputSchema, getEventBySlug, listEvents, type EventDto } from "@/data-access";

/**
 * Creates an event from multipart FormData, uploads its image, validates the combined payload, and persists the event.
 *
 * @param eventData - FormData containing event fields; must include an `image` File and may include `tags` and `agenda` as JSON strings.
 * @returns The newly created event data
 * @throws BadRequestError - If FormData cannot be parsed, `image` is missing, or the event payload fails validation.
 * @throws Error - If persisting the event fails; the underlying data-layer error is rethrown.
 * Note: If the image upload succeeds but validation or persistence fails, the uploaded image asset is removed.
 */
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

/**
 * Fetches all events from the data store.
 *
 * @returns An array of event DTOs (`EventDto[]`) representing all stored events.
 * @throws AppError when fetching events fails
 */
export async function getAllEventsService() {
    await dbConnect();

    const eventsRes = await tryCatch(listEvents({}));

    if(eventsRes.error) throw new AppError("Failed to fetch events", 500);

    return eventsRes.data;
}

/**
 * Retrieve a single event by its slug.
 *
 * @param slug - The unique slug identifier of the event to retrieve
 * @returns The event data matching the provided slug
 * @throws NotFoundError if no event exists with the given slug
 * @throws Error if the data access layer returns an error
 */
export async function getEventBySlugService(slug: string) {
    await dbConnect();

    const eventsRes = await tryCatch(getEventBySlug(slug));

    if(eventsRes.error) throw eventsRes.error;      
    if(!eventsRes.data) throw new NotFoundError("There is no Event with this Slug");

    return eventsRes.data;
}

/**
 * Finds events that share any tag with the event identified by the given slug, excluding the event itself.
 *
 * @param slug - The slug of the reference event
 * @returns An array of `EventDto` objects that have at least one tag in common with the reference event; returns an empty array if no matches are found or if the query fails
 */
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