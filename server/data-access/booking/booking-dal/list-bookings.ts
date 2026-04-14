import { Prisma } from '@/server/prisma/client';
import { type BookingDto, mapBookingToDto } from '../booking-dtos';
import prisma from '@/lib/db/db';

export async function listBookings(where: Prisma.BookingWhereInput = {}): Promise<BookingDto[]> {
  const docs = await prisma.booking.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  return docs.map(mapBookingToDto);
}
