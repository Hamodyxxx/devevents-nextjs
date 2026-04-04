"use server"

import { createBookingByEmailService } from "@/server/services/bookings.service";
import { withErrorHandlerAction } from "@/lib/errors/with-error-handler";

export const createBookingByEmailAction = withErrorHandlerAction(async (eventId: string, email: string) => {
    const res = await createBookingByEmailService({ eventId, email });

    return { success: true, data: JSON.parse(JSON.stringify(res)) };
});
