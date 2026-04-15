import z from "zod";
import { EventCoreSchema } from "./event.schema";

export const CreateEventOutput = EventCoreSchema.extend({
    id: z.string(),
    slug: z.string(),
    bookingCount: z.number().int().nonnegative(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  });;

export const GetAllEventsOutput = z.object({
    events: z.array(CreateEventOutput),
    hasNextPage: z.boolean()
})

export const GetEventBySlugOutput = CreateEventOutput;

export const GetSimilarEventsBySlugOutput = z.array(CreateEventOutput);