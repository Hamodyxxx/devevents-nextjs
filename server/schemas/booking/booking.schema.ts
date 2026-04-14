import { z } from "zod";

export const BookingCoreSchema = z.object({
  eventId: z.string({
    error: "Event ID is required",
  }).min(1, "Event ID cannot be empty"),
  
  email: z.email("Please provide a valid email address")
    .trim()
    .lowercase(),
});