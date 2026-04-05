import { base } from "@/server/orpc/init";
import { getAllEventsService } from "@/server/services/events.service";
import z from "zod";

export const getAllEventsProcedure = base
    .route({
        path:"/events",
        method: "GET"
    })
    .input(
        z.object({
            q: z.string().default(""),
            page: z.number().default(1),
            limit: z.number()
                .min(1, "limit can not be less than 1.")
                .max(59, "you can't request more than 59 events per fetch.")
                .default(10)
        }).optional()
    )
    .handler(async ({
        input,
    }) => {
        const res = await getAllEventsService({
            searchQuery: input?.q,
            page: input?.page,
            limit: input?.limit
        });

        return {
            message: "Events Fetched Successfully",
            data: {
                events: res.data,
                hasNextPage: res.hasNextPage
            }
        }
    })