import { AppError, BadRequestError, NotFoundError } from "@/lib/errors/app-error";
import { tryCatch, tryCatchSync } from "@/lib/try-catch";
import { v2 } from "cloudinary";
import { uploadImageToCloudinaryService } from "./image.service";
import { createEvent, CreateEventInputSchema, getEventBySlug, listEvents, type EventDto } from "@/server/data-access";
import { CreateEventProcedureInputType } from "../routes/events/create-event.procedure";
import { parseJsonArray } from "@/utils/parse-json-array";

/**
 * Creates a new event from submitted FormData, uploads its image, validates the payload, and persists the event.
 *
 * @param eventData - FormData containing event fields. Must include an `image` File; may include `tags` and `agenda` as JSON-encoded strings.
 * @returns The created event object.
 * @throws BadRequestError - If the FormData cannot be converted to an object, if `image` is missing, or if the validated event payload is invalid.
 * @throws Any error returned by the data layer when creating the event.
 */
export async function createEventService(
    eventData: CreateEventProcedureInputType
) {
    const file = eventData.image as File;
    if(!file) throw new BadRequestError('image is required');

    const tags = parseJsonArray(eventData.tags, "tags");
    const agenda = parseJsonArray(eventData.agenda, "agenda");

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadImageToCloudinaryService(buffer);

    const event = {
        ...eventData,
        tags: tags,
        agenda: agenda,
        image: uploadResult.secure_url
    }

    const parsed = CreateEventInputSchema.safeParse(event);

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

interface GetAllEventsServiceArgs {
    searchQuery?: string;
    page?: number;
    limit?: number;
}
/**
 * Retrieves all events from the data layer.
 *
 * @returns An array of event DTOs.
 * @throws AppError when fetching events fails.
 */
export async function getAllEventsService({
    searchQuery = "",
    page = 1,
    limit = 10
}: GetAllEventsServiceArgs) {

    const where: Record<string, any> = {};

    if (searchQuery) {
        where.title = { $regex: searchQuery, $options: 'i' };
    }


    const eventsRes = await tryCatch(listEvents({
        where: where,
        limit,
        page
    }));

    if(eventsRes.error) throw new AppError("Failed to fetch events", 500);

    return eventsRes.data;
}

/**
 * Retrieve a single event by its URL-friendly slug.
 *
 * @param slug - The event's slug (URL-friendly identifier)
 * @returns The event matching the provided `slug`
 * @throws NotFoundError if no event exists with the given `slug`
 * @throws Any error returned by the data access layer when retrieval fails
 */
export async function getEventBySlugService(slug: string) {
    const eventsRes = await tryCatch(getEventBySlug(slug));

    if(eventsRes.error) throw eventsRes.error;      
    if(!eventsRes.data) throw new NotFoundError("There is no Event with this Slug");

    return eventsRes.data;
}

/**
 * Fetches events that share tags with the event identified by the given slug, excluding the event itself.
 *
 * @param slug - The slug of the reference event used to find similar events
 * @returns An array of `EventDto` objects with overlapping tags; returns an empty array if no similar events are found or if the similarity query fails
 */
export async function getSimilarEventsBySlugService(slug: string): Promise<EventDto[]> {
    const event = await getEventBySlugService(slug);

    // Similarity query needs a flexible filter; keep it in DAL but pass raw mongo filter.
    const similarEventsRes = await tryCatch(
        listEvents({
            where: {
                _id: { $ne: event.id },
                tags: { $in: event.tags },
            }
        })
    );

    if(similarEventsRes.error) return [];
    if(!similarEventsRes.data) return [];

    return similarEventsRes.data.data;
}