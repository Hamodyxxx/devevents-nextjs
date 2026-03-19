import { AppError } from "@/lib/app-error";
import { tryCatch, tryCatchSync } from "@/lib/try-catch";
import { createEventService, getAllEventsService } from "@/services/events.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    const formDataRes = await tryCatch(req.formData());
    if(formDataRes.error) return NextResponse.json({
        message: "body should be of type formdata"
    }, { status: 400 });

    const eventResult = await tryCatch(createEventService(formDataRes.data));

    if(eventResult.error) {
        console.log(eventResult.error);
        if (eventResult.error instanceof AppError) {
            return NextResponse.json({ message: eventResult.error.message }, { status: eventResult.error.statusCode });
        }
        return NextResponse.json({ message: eventResult.error.message || "Server Error" }, { status: 500 });
    }

    return NextResponse.json({
        message: "Event Created Successfully",
        data: {
            event: eventResult.data
        }
    }, { status: 201 });

}


export const GET = async () => {
    const eventsRes = await tryCatch(getAllEventsService());

    if(eventsRes.error) {
        if (eventsRes.error instanceof AppError) {
            return NextResponse.json({ message: eventsRes.error.message }, { status: eventsRes.error.statusCode });
        }
        return NextResponse.json({ message: eventsRes.error.message || "Server Error" }, { status: 500 });
    }

    return NextResponse.json({
        message: "Events Listed Successfully",
        data: {
            events: eventsRes.data 
        }
    }, { status: 200 })
}