import BookEventModal from "@/components/modals/book-event-modal";
import { createBookingByEmailService } from "@/server/services/bookings.service";
import { base } from "@/server/orpc/init";
import z from "zod";

export const bookEventByEmailProcedure = base
    .input(z.object({ eventId: z.string(), email: z.email()}))
    .route({
        method: "POST",
        path: "/bookings"
    })
    .handler(async ({ input }) => {
        const booking = await createBookingByEmailService(input); 

        return {
            message: "Booking Created Successfully",
            data: {
                booking
            }
        }
    })