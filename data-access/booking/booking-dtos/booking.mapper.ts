import type { IBooking } from '@/database/booking.model';

import { BookingDtoSchema, type BookingDto } from './booking.dto';

/**
 * Convert a booking database document into a validated BookingDto.
 *
 * @param doc - The booking document from the database whose identifiers and timestamps will be serialized for the DTO
 * @returns The validated `BookingDto` representation of `doc`
 * @throws If the constructed DTO does not satisfy `BookingDtoSchema` validation
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

