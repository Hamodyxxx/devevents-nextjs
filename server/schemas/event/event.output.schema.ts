import z from "zod";
import { EventSchema } from "./event.schema";

export const CreateEventOutput = EventSchema;

export const GetAllEventsOutput = z.object({
    events: z.array(EventSchema),
    hasNextPage: z.boolean()
})

export const GetEventBySlugOutput = EventSchema;

export const GetSimilarEventsBySlugOutput = z.array(EventSchema);