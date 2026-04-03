import Booking from '@/database/booking.model';

import {
  CreateBookingInputSchema,
  type CreateBookingInput,
  type BookingDto,
  mapBookingToDto,
} from '../booking-dtos';

/**
 * Create a new booking for an event.
 *
 * @param input - Booking creation input; must include `eventId` and `email`. The `email` will be normalized to lowercase before persistence.
 * @returns The created booking represented as a `BookingDto`.
 */
export async function createBooking(input: CreateBookingInput): Promise<BookingDto> {
  const parsed = CreateBookingInputSchema.parse(input);
  const doc = await Booking.create({
    eventId: parsed.eventId,
    email: parsed.email.toLowerCase(),
  });
  return mapBookingToDto(doc);
}

