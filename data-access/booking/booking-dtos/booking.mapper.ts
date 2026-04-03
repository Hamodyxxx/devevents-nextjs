import type { IBooking } from '@/database/booking.model';

import { BookingDtoSchema, type BookingDto } from './booking.dto';

export function mapBookingToDto(doc: IBooking): BookingDto {
  const dto: BookingDto = {
    id: doc._id.toString(),
    eventId: doc.eventId.toString(),
    email: doc.email,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };

  return BookingDtoSchema.parse(dto);
}

