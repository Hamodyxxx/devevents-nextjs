import Booking from '@/database/booking.model';

import { type BookingDto, mapBookingToDto } from '../booking-dtos';

/**
 * Retrieve bookings matching the provided filter and map them to `BookingDto`.
 *
 * @param where - MongoDB-style filter object used to select bookings; defaults to `{}` to select all bookings
 * @returns An array of `BookingDto` objects for bookings that match the filter, sorted by `createdAt` descending
 */
export async function listBookings(where: Record<string, unknown> = {}): Promise<BookingDto[]> {
  const docs = await Booking.find(where as never).sort({ createdAt: -1 });
  return docs.map(mapBookingToDto);
}

