import { z } from 'zod';

import Booking from '@/database/booking.model';

import { type BookingDto, mapBookingToDto } from '../booking-dtos';

/**
 * Retrieve bookings for an email address as BookingDto objects.
 *
 * The input `email` is validated and normalized to lowercase before querying.
 *
 * @param email - The email address to query; validation is applied and casing is ignored.
 * @returns An array of bookings matching `email`, mapped to `BookingDto`, sorted by `createdAt` descending.
 * @throws If `email` is not a valid email address.
 */
export async function listBookingsByEmail(email: string): Promise<BookingDto[]> {
  const parsedEmail = z.email().parse(email).toLowerCase();
  const docs = await Booking.find({ email: parsedEmail }).sort({ createdAt: -1 });
  return docs.map(mapBookingToDto);
}

