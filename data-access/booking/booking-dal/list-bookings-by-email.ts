import { z } from 'zod';

import Booking from '@/database/booking.model';

import { type BookingDto, mapBookingToDto } from '../booking-dtos';

/**
 * Retrieve bookings for the given email address, normalized to lowercase, sorted newest-first, and returned as `BookingDto` objects.
 *
 * @param email - Email address to query; it will be validated and converted to lowercase.
 * @returns An array of bookings for the provided email sorted by `createdAt` descending as `BookingDto` objects.
 * @throws If `email` is not a valid email address.
 */
export async function listBookingsByEmail(email: string): Promise<BookingDto[]> {
  const parsedEmail = z.email().parse(email).toLowerCase();
  const docs = await Booking.find({ email: parsedEmail }).sort({ createdAt: -1 });
  return docs.map(mapBookingToDto);
}

