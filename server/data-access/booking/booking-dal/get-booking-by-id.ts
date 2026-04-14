import { type BookingDto, mapBookingToDto } from '../booking-dtos';
import prisma from '@/lib/db/db';

/**
 * Fetches a booking by its ObjectId string and returns the booking as a DTO if found.
 *
 * @param id - String representation of the booking's MongoDB ObjectId; this value is validated and parsed before lookup.
 * @returns The matching `BookingDto` if a document is found, `null` otherwise.
 */
export async function getBookingById(id: string): Promise<BookingDto | null> {
  const booking = await prisma.booking.findUnique({ where: { id } });
  return booking ? mapBookingToDto(booking) : null;
}