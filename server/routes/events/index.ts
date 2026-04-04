import { createEventProcedure } from "./create-event.procedure";
import { getAllEventsProcedure } from "./get-all-events.procedure";
import { getEventBySlugProcedure } from "./get-event-by-slug.procedure";
import { getSimilarEventsProcedure } from "./get-similar-events.procedure";

export const eventsRouter = {
    create: createEventProcedure,
    getAll: getAllEventsProcedure,
    getBySlug: getEventBySlugProcedure,
    getSimilar: getSimilarEventsProcedure
}