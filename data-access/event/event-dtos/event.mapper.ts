import type { IEvent } from '@/database/event.model';

import { EventDtoSchema, type EventDto } from './event.dto';

/**
 * Map a database event document to a validated EventDto.
 *
 * @param doc - The event document (IEvent) retrieved from the database.
 * @returns The resulting EventDto with `id` as a string and `createdAt`/`updatedAt` as ISO 8601 strings.
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

