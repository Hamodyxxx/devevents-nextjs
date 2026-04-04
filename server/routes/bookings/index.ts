import { bookEventByEmailProcedure } from "./book-event-by-email.procedure";

export const bookingRouter = {
    create: bookEventByEmailProcedure,
};