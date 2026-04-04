import type { ClientSession } from 'mongoose';

import Booking from '@/server/database/booking.model';
import {
  CreateBookingInputSchema,
  type CreateBookingInput,
  type BookingDto,
  mapBookingToDto,
} from '../booking-dtos';

export async function createBooking(
  input: CreateBookingInput,
  session?: ClientSession
): Promise<BookingDto> {
  const parsed = CreateBookingInputSchema.parse(input);
  const payload = {
    eventId: parsed.eventId,
    email: parsed.email.toLowerCase(),
  };

  if (session) {
    const docs = await Booking.create([payload], { session });
    const doc = docs[0];
    if (!doc) throw new Error('Failed to create booking');
    return mapBookingToDto(doc);
  }

  const doc = await Booking.create(payload);
  return mapBookingToDto(doc);
}

