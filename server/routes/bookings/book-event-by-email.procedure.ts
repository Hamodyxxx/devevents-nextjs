import { createBookingByEmailService } from "@/server/services/bookings.service";
import { base } from "@/server/orpc/init";
import z from "zod";
import { ObjectIdStringSchema } from "@/server/data-access";

export const bookEventByEmailProcedure = base
    .input(z.object({ eventId: ObjectIdStringSchema, email: z.email()}))
    .route({
        method: "POST",
        path: "/bookings"
    })
    .handler(async ({ input }) => {
        const booking = await createBookingByEmailService(input); 

        return {
            message: "Booking Created Successfully.",
            data: {
                booking
            }
        }
    })