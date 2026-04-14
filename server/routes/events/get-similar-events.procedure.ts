import { base } from "@/server/orpc";
import { getRelatedEventsService } from "@/server/services/events.service";

export const getSimilarEventsProcedure = base.event.getSimilarBySlug
    .handler(async ({ input }) => {
        const events = await getRelatedEventsService(input.slug);

        return events;
    })