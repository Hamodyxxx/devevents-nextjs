import Booking from '@/database/booking.model';

import { type BookingDto, mapBookingToDto } from '../booking-dtos';

/**
 * Retrieve bookings that match the given filter and return them as DTOs sorted by creation date (newest first).
 *
 * @param where - Query filter used to select bookings; defaults to an empty filter that matches all bookings
 * @returns An array of `BookingDto` objects sorted by `createdAt` in descending order
 */
export async function listBookings(where: Record<string, unknown> = {}): Promise<BookingDto[]> {
  const docs = await Booking.find(where as never).sort({ createdAt: -1 });
  return docs.map(mapBookingToDto);
}

