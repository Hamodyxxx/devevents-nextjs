import { implement } from "@orpc/server";
import { bookingRouter } from "./bookings";
import { eventsRouter } from "./events";
import { contract } from "../contract";

const os = implement(contract);

export const mainRouter = {
    bookings: bookingRouter,
    events: eventsRouter
};