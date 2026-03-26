import { AppError } from "@/lib/app-error";
import { tryCatch } from "@/lib/try-catch";
import {  getSimilarEventsBySlugService } from "@/services/events.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const eventsRes = await tryCatch(getSimilarEventsBySlugService(slug));

    if(eventsRes.error) {
        if (eventsRes.error instanceof AppError) {
            return NextResponse.json({ message: eventsRes.error.message }, { status: eventsRes.error.statusCode });
        }
        return NextResponse.json({ message: eventsRes.error.message || "Server Error" }, { status: 500 });
    }

    return NextResponse.json({
        message: "Found Similar Events",
        data: {
            events: eventsRes.data 
        }
    }, { status: 200 })
}