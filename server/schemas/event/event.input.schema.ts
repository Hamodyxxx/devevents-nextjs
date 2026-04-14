import { parseJsonArray } from "@/utils/parse-json-array";
import { z } from "zod";
import { EventCoreSchema } from "./event.schema";

export const CreateEventInputSchema = EventCoreSchema.extend({
  tags: z.string().transform(
    (val) => parseJsonArray(val, "tags")
  ).pipe(
    z.array(z.string()).min(1, "At least one tag is required")
  ),

  agenda: z.string().transform(
    (val: string) => parseJsonArray(val, "agenda"),
  ).pipe(
    z.array(z.string()).min(1, "At least one agenda item is required")
  ),

  image: z.instanceof(File),
});

export const GetAllEventsInput = z.object({
    q: z.string().default(""),
    page: z.number().default(1),
    limit: z.number()
        .min(1, "limit can not be less than 1.")
        .max(59, "you can't request more than 59 events per fetch.")
        .default(10)
}).optional()

export const GetEventBySlugInput = z.object({
  slug: z.string()
})

export const GetSimilarEventsBySlugInput = GetEventBySlugInput;