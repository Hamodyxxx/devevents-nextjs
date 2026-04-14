import { tryCatch } from "@/lib/try-catch";
import { listEvents } from "@/server/data-access";
import { base } from "@/server/orpc";

export const getAllEventsProcedure = base.event.getAll
    .handler(async ({
        input,
        errors
    }) => {
        const where: Record<string, any> = {};

        if (input?.q) {
            where.title = { $regex: input?.q, $options: 'i' };
        }
    
        const eventsRes = await tryCatch(listEvents({
            where: where,
            limit: input?.limit,
            page: input?.page,
        }));
    
        if(eventsRes.error) throw errors.INTERNAL_SERVER_ERROR({
            message: "failed to fetch events"
        });

        const res = eventsRes.data;
    
        return {
            events: res.data,
            hasNextPage: res.hasNextPage
        }
    })