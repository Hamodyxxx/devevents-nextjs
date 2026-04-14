import { base } from "../orpc";
import { bookEventByEmailProcedure } from "./bookings/book-event-by-email.procedure";
import { createEventProcedure } from "./events/create-event.procedure";
import { getAllEventsProcedure } from "./events/get-all-events.procedure";
import { getEventBySlugProcedure } from "./events/get-event-by-slug.procedure";
import { getSimilarEventsProcedure } from "./events/get-similar-events.procedure";

export const mainRouter = base.router({
    booking: {
        create: bookEventByEmailProcedure
    },
    event: {
        create: createEventProcedure,
        getAll: getAllEventsProcedure,
        getBySlug: getEventBySlugProcedure,
        getSimilarBySlug: getSimilarEventsProcedure
    }
});