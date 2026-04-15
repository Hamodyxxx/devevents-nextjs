import z from "zod";
import { BookingDtoSchema } from "./booking.dto";

export const CreateBookingInputSchema = BookingDtoSchema.pick({
  eventId: true,
  email: true,
});

export type CreateBookingInput = z.infer<typeof CreateBookingInputSchema>;