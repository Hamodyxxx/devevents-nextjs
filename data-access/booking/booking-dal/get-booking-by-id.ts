import Booking from '@/database/booking.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import { type BookingDto, mapBookingToDto } from '../booking-dtos';

/**
 * Fetches a booking by its ObjectId string and returns the booking as a DTO if found.
 *
 * @param id - String representation of the booking's MongoDB ObjectId; this value is validated and parsed before lookup.
 * @returns The matching `BookingDto` if a document is found, `null` otherwise.
 */
export async function getBookingById(id: string): Promise<BookingDto | null> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const doc = await Booking.findById(parsedId);
  return doc ? mapBookingToDto(doc) : null;
}

