import type { IEvent } from '@/database/event.model';

import { EventDtoSchema, type EventDto } from './event.dto';

/**
 * Convert an event database document into a validated EventDto.
 *
 * @param doc - The event document (database model) to convert into a DTO
 * @returns The validated EventDto built from `doc`
 * @throws If the constructed DTO does not conform to `EventDtoSchema`
 */
export function mapEventToDto(doc: IEvent): EventDto {
  const dto: EventDto = {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    overview: doc.overview,
    image: doc.image,
    venue: doc.venue,
    location: doc.location,
    date: doc.date,
    time: doc.time,
    mode: doc.mode,
    audience: doc.audience,
    agenda: doc.agenda,
    organizer: doc.organizer,
    tags: doc.tags,
    bookingCount: doc.bookingCount,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };

  return EventDtoSchema.parse(dto);
}

