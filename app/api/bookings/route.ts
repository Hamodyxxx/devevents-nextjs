import { AppError, BadRequestError } from "@/lib/errors/app-error";
import { tryCatch } from "@/lib/try-catch";
import { withErrorHandlerApi } from "@/lib/errors/with-error-handler";
import { createBookingByEmailService } from "@/services/bookings.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = withErrorHandlerApi(async (req: NextRequest) => {
    const bodyRes = await tryCatch(req.json());

    if(bodyRes.error) throw new BadRequestError("Invalid JSON body");

    const { eventId, email } = bodyRes.data;

    if (!eventId || !email) {
        throw new BadRequestError("eventId and email are required");
    }

    const booking = await createBookingByEmailService({ eventId, email });

    return NextResponse.json({
        message: "Booking created successfully",
        data: {
            booking 
        }
    }, { status: 201 });
});
