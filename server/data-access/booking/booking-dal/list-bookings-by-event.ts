import Booking from '@/server/database/booking.model';
import { ObjectIdStringSchema } from '@/server/data-access/_shared';

import { type BookingDto, mapBookingToDto } from '../booking-dtos';

/**
 * Retrieve bookings for the specified event, ordered by creation time descending.
 *
 * @param eventId - The event identifier as a MongoDB ObjectId string (will be validated/parsed)
 * @returns An array of `BookingDto` objects for the event, sorted newest first by `createdAt`
 */
export async function listBookingsByEvent(eventId: string): Promise<BookingDto[]> {
  const parsedEventId = ObjectIdStringSchema.parse(eventId);
  const docs = await Booking.find({ eventId: parsedEventId }).sort({ createdAt: -1 });
  return docs.map(mapBookingToDto);
}

