import { bookingRouter } from "./bookings";
import { eventsRouter } from "./events";

export const mainRouter = {
    bookings: bookingRouter,
    events: eventsRouter
};