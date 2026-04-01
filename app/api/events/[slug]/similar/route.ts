import { withErrorHandlerApi } from "@/lib/errors/with-error-handler";
import { getSimilarEventsBySlugService } from "@/services/events.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandlerApi(async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const events = await getSimilarEventsBySlugService(slug);

    return NextResponse.json({
        message: "Found Similar Events",
        data: {
            events 
        }
    }, { status: 200 })
});