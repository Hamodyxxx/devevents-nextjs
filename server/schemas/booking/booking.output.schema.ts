import z from "zod";
import { BookingCoreSchema } from "./booking.schema";

export const BookingOutputSchema = BookingCoreSchema.extend({
    id: z.string(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  });