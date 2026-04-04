import { base } from "@/server/orpc/init";
import { getSimilarEventsBySlugService } from "@/server/services/events.service";
import z from "zod";

export const getSimilarEventsProcedure = base
    .route({
        path: "/events/{slug}/similar",
        method: "GET"
    })
    .input(z.object({
        slug: z.string()
    }))
    .handler(async ({ input }) => {
        const events = await getSimilarEventsBySlugService(input.slug);

        return {
            message: "Found Similar Events",
            data: {
                events
            }
        }
    })