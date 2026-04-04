import { EventDtoSchema } from "@/server/data-access";
import { base,  } from "@/server/orpc/init";
import { createEventService } from "@/server/services/events.service";
import { revalidateTag } from "next/cache";
import z from "zod";

export const CreateEventProcedureInputSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    overview: z.string().min(1),
    image: z.instanceof(File),
    venue: z.string().min(1),
    location: z.string().min(1),
    date: z.string().min(1),
    time: z.string().min(1),
    mode: z.string().min(1),
    audience: z.string().min(1),
    agenda: z.string(),
    organizer: z.string().min(1),
    tags: z.string(),
});

export type CreateEventProcedureInputType = z.infer<typeof CreateEventProcedureInputSchema>;

export const createEventProcedure = base
    .route({
        method: "POST",
        path: "/events"
    })
    .input(CreateEventProcedureInputSchema)
    .output(z.object({
        message: z.string(),
        data: z.object({
            event: EventDtoSchema
        })
    }))
    .handler(async ({ input }) => {
        const event = await createEventService(input);

        revalidateTag("featured events", "hours");

        return {
            message: "Event created Successfully",
            data: {
                event
            }
        }
    })

