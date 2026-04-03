import Booking from '@/database/booking.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import { type BookingDto, mapBookingToDto } from '../booking-dtos';

/**
 * Retrieves a booking by its string ObjectId and returns its DTO representation.
 *
 * @param id - The booking's ObjectId as a string; this value is validated and parsed into a database identifier
 * @returns The corresponding BookingDto if a matching booking exists, `null` otherwise
 */
export async function getBookingById(id: string): Promise<BookingDto | null> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const doc = await Booking.findById(parsedId);
  return doc ? mapBookingToDto(doc) : null;
}

