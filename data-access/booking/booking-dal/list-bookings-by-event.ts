import Booking from '@/database/booking.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import { type BookingDto, mapBookingToDto } from '../booking-dtos';

export async function listBookingsByEvent(eventId: string): Promise<BookingDto[]> {
  const parsedEventId = ObjectIdStringSchema.parse(eventId);
  const docs = await Booking.find({ eventId: parsedEventId }).sort({ createdAt: -1 });
  return docs.map(mapBookingToDto);
}

