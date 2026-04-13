import { IsoDateTimeStringSchema, ObjectIdStringSchema } from "@/server/data-access";
import { z } from "zod";

export const BookingSchema = z.object({
  id: ObjectIdStringSchema,
  eventId: z.string({
    error: "Event ID is required",
  }).min(1, "Event ID cannot be empty"),

  email: z.email({
    error: "Please provide a valid email address",
  })
    .trim()
    .lowercase(),
    
  createdAt: IsoDateTimeStringSchema,
  updatedAt: IsoDateTimeStringSchema,
});