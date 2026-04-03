import Booking from '@/database/booking.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import { type BookingDto, mapBookingToDto } from '../booking-dtos';

export async function getBookingById(id: string): Promise<BookingDto | null> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const doc = await Booking.findById(parsedId);
  return doc ? mapBookingToDto(doc) : null;
}

