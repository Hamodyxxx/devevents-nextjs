import { base } from "@/server/orpc/init";
import { GetAllEventsInput } from "@/server/schemas/event/event.input.schema";
import { getAllEventsService } from "@/server/services/events.service";
import z from "zod";

export const getAllEventsProcedure = base
    .route({
        path:"/events",
        method: "GET"
    })
    .input(GetAllEventsInput)
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