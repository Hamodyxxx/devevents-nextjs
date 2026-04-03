import type { IBooking } from '@/database/booking.model';

import { BookingDtoSchema, type BookingDto } from './booking.dto';

/**
 * Convert a booking database document into a validated BookingDto.
 *
 * @param doc - The booking database document to convert (contains Mongo-style ObjectIds and Date fields)
 * @returns A BookingDto with `id` and `eventId` as strings, `createdAt`/`updatedAt` as ISO timestamp strings, and `email` preserved
 */
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

