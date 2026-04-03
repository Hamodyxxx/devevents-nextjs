import Booking from '@/database/booking.model';

import { type BookingDto, mapBookingToDto } from '../booking-dtos';

export async function listBookings(where: Record<string, unknown> = {}): Promise<BookingDto[]> {
  const docs = await Booking.find(where as never).sort({ createdAt: -1 });
  return docs.map(mapBookingToDto);
}

