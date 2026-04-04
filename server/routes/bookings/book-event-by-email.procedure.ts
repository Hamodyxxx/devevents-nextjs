import BookEventModal from "@/components/modals/book-event-modal";
import { createBookingByEmailService } from "@/server/services/bookings.service";
import { publicProcedure } from "@/server/trpc/init";
import z from "zod";

export const bookEventByEmail = publicProcedure
    .input(z.object({ eventId: z.string(), email: z.email()}))
    .mutation(async ({ input }) => {
        const booking = await createBookingByEmailService(input); 

        return {
            message: "Booking Created Successfully",
            data: {
                booking
            }
        }
    })