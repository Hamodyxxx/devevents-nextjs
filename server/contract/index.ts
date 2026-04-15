import { BookEventByIdContract } from "./booking.contract";
import { createEventContract, getAllEventsContract, getEventBySlugContract, getSimilarEventsBySlugContract } from "./event.contract";

export const contract = {
    event: {
        create: createEventContract,
        getAll: getAllEventsContract,
        getBySlug: getEventBySlugContract,
        getSimilarBySlug: getSimilarEventsBySlugContract
    },
    booking: {
        create: BookEventByIdContract
    }
}