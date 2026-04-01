import { withErrorHandlerApi } from "@/lib/errors/with-error-handler";
import { getEventBySlugService } from "@/services/events.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandlerApi(async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const event = await getEventBySlugService(slug);

    return NextResponse.json({
        message: "Event Found Successfully",
        data: {
            event 
        }
    }, { status: 200 })
});