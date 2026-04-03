import { z } from 'zod';

import Booking from '@/database/booking.model';

import { type BookingDto, mapBookingToDto } from '../booking-dtos';

export async function listBookingsByEmail(email: string): Promise<BookingDto[]> {
  const parsedEmail = z.email().parse(email).toLowerCase();
  const docs = await Booking.find({ email: parsedEmail }).sort({ createdAt: -1 });
  return docs.map(mapBookingToDto);
}

