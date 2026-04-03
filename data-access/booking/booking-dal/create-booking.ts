import Booking from '@/database/booking.model';

import {
  CreateBookingInputSchema,
  type CreateBookingInput,
  type BookingDto,
  mapBookingToDto,
} from '../booking-dtos';

export async function createBooking(input: CreateBookingInput): Promise<BookingDto> {
  const parsed = CreateBookingInputSchema.parse(input);
  const doc = await Booking.create({
    eventId: parsed.eventId,
    email: parsed.email.toLowerCase(),
  });
  return mapBookingToDto(doc);
}

