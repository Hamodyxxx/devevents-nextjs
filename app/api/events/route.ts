import Event from "@/database/event.model";
import { compose } from "@/lib/middlewares/compose";
import { withErrorHandler } from "@/lib/middlewares/with-error-handler";
import dbConnect from "@/lib/mongo";
import { tryCatch, tryCatchSync } from "@/lib/try-catch";
import { NextRequest, NextResponse } from "next/server";

export const POST = compose(
    withErrorHandler((e) => ({
        message: "Event Creation Failed",
        data: {
            error: e instanceof Error ? e.message : "unknown"
        }
    })),
    async (req: NextRequest, _) => {
        await dbConnect();

        const formData = await req.formData();

        const {
            data: eventData,
            error
        } = tryCatchSync(() => Object.fromEntries(formData));

        if(error) return NextResponse.json({
            message: "Invalid JSON data format"
        }, { status: 400 });

        const createdEvent = await Event.create(eventData);

        return NextResponse.json({
            message: "Event Created Successfully",
            data: {
                event: createdEvent
            }
        }, { status: 201 });

    }
);