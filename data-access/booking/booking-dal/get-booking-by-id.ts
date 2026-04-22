import Booking from '@/database/booking.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import { type BookingDto, mapBookingToDto } from '../booking-dtos';

/**
 * Retrieve a booking by its MongoDB ObjectId string.
 *
 * @param id - The booking's MongoDB ObjectId as a string
 * @returns The matching `BookingDto` if found, `null` otherwise.
 */
export async function getBookingById(id: string): Promise<BookingDto | null> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const doc = await Booking.findById(parsedId);
  return doc ? mapBookingToDto(doc) : null;
}

