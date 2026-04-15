import { BookEventByIdInputSchema } from "../schemas/booking/booking.input.schema";
import { BookingOutputSchema } from "../schemas/booking/booking.output.schema";
import { baseOc } from "./base";

export const BookEventByIdContract = baseOc.input(BookEventByIdInputSchema).output(BookingOutputSchema);