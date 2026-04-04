import { base } from "@/server/orpc/init";
import { getAllEventsService } from "@/server/services/events.service";

export const getAllEventsProcedure = base
    .route({
        path:"/events",
        method: "GET"
    })
    .handler(async () => {
        const events = await getAllEventsService();

        return {
            message: "Events Fetched Successfully",
            data: {
                events
            }
        }
    })