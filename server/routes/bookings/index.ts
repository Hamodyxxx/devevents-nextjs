import { createRouter } from "@/server/trpc/init";
import { bookEventByEmail } from "./book-event-by-email.procedure";

export const bookingRouter = createRouter({
    create: bookEventByEmail,
});