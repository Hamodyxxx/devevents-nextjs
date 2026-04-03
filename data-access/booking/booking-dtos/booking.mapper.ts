import type { IBooking } from '@/database/booking.model';

import { BookingDtoSchema, type BookingDto } from './booking.dto';

/**
 * Convert a booking database document into a validated data transfer object.
 *
 * @param doc - The booking database document containing Mongo-style ObjectIds and Date fields
 * @returns A BookingDto whose `id` and `eventId` are strings, `createdAt` and `updatedAt` are ISO 8601 timestamp strings, and `email` is preserved
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

