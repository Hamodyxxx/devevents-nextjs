import { AppError } from "@/lib/app-error";
import { tryCatch } from "@/lib/try-catch";
import { getEventBySlug } from "@/services/events.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const eventsRes = await tryCatch(getEventBySlug(slug));

    if(eventsRes.error) {
        if (eventsRes.error instanceof AppError) {
            return NextResponse.json({ message: eventsRes.error.message }, { status: eventsRes.error.statusCode });
        }
        return NextResponse.json({ message: eventsRes.error.message || "Server Error" }, { status: 500 });
    }

    return NextResponse.json({
        message: "Events Found Successfully",
        data: {
            event: eventsRes.data 
        }
    }, { status: 200 })
}