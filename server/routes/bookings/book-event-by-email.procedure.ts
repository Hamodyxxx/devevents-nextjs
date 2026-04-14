import { base } from "@/server/orpc";
import { createBookingByEmailService } from "@/server/services/bookings.service";
import z from "zod";

export const bookEventByEmailProcedure = base.booking.create
    .handler(async ({ input }) => {
        const booking = await createBookingByEmailService(input); 

        return booking;
    })