import { getEventBySlug } from "@/server/data-access";
import { base } from "@/server/orpc";

export const getEventBySlugProcedure = base.event.getBySlug
    .handler(async ({ input, errors }) => {
        const event = await getEventBySlug(input.slug);

        if(!event) throw errors.NOT_FOUND();
        
        return event;
    })