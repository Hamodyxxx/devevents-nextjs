import { AppError } from "@/lib/errors/app-error";
import { withErrorHandlerApi } from "@/lib/errors/with-error-handler";
import { tryCatch } from "@/lib/try-catch";
import { createEventService, getAllEventsService } from "@/services/events.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = withErrorHandlerApi(async (req: NextRequest) => {
    const formDataRes = await tryCatch(req.formData());
    if(formDataRes.error) throw new AppError("body should be of type formdata", 400);

    const event = await createEventService(formDataRes.data);

    return NextResponse.json({
        message: "Event Created Successfully",
        data: {
            event
        }
    }, { status: 201 });

});

export const GET = withErrorHandlerApi(async () => {
    const events = await getAllEventsService();

    return NextResponse.json({
        message: "Events Listed Successfully",
        data: {
            events 
        }
    }, { status: 200 })
});