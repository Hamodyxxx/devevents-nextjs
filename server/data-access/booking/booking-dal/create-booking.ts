
import {
  CreateBookingInputSchema,
  type CreateBookingInput,
  type BookingDto,
  mapBookingToDto,
} from '../booking-dtos';
import prisma from '@/lib/db/db';

export async function createBooking(
  input: CreateBookingInput,
): Promise<BookingDto> {
  const parsed = CreateBookingInputSchema.parse(input);
  const payload = {
    eventId: parsed.eventId,
    email: parsed.email.toLowerCase(),
  };

  const booking = await prisma.booking.create({
    data: payload
  });
  return mapBookingToDto(booking);
}