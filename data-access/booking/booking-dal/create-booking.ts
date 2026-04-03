import Booking from '@/database/booking.model';

import {
  CreateBookingInputSchema,
  type CreateBookingInput,
  type BookingDto,
  mapBookingToDto,
} from '../booking-dtos';

/**
 * Create a new booking for an event using the provided input.
 *
 * @param input - The booking data (eventId and email) used to create the record
 * @returns The created booking mapped to a `BookingDto`
 */
export async function createBooking(input: CreateBookingInput): Promise<BookingDto> {
  const parsed = CreateBookingInputSchema.parse(input);
  const doc = await Booking.create({
    eventId: parsed.eventId,
    email: parsed.email.toLowerCase(),
  });
  return mapBookingToDto(doc);
}

