import { base } from "@/server/orpc/init";
import { getEventBySlugService } from "@/server/services/events.service";
import z from "zod";

export const getEventBySlugProcedure = base
    .route({
        path: "/events/{slug}",
        method: "GET"
    })
    .input(z.object({slug: z.string()}))
    .handler(async ({ input }) => {
        const event = await getEventBySlugService(input.slug);

        return {
            message: "Event Found Successfully.",
            data: {
                event
            }
        }
    })