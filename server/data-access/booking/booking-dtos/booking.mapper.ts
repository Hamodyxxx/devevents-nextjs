
import { Prisma } from '@/server/prisma/client';
import { BookingDtoSchema, type BookingDto } from './booking.dto';


export function mapBookingToDto(booking: Prisma.BookingGetPayload<{}>): BookingDto {
  return BookingDtoSchema.parse({
    ...booking,
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  });
}