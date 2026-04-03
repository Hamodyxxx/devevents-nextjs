import Event from '@/database/event.model';

import { type EventDto, mapEventToDto } from '../event-dtos';

/**
 * Retrieve an event by its slug (lookup is case-insensitive).
 *
 * @param slug - The event slug to look up; case is ignored.
 * @returns The matched `EventDto` if an event exists for the slug, `null` otherwise.
 */
export async function getEventBySlug(slug: string): Promise<EventDto | null> {
  const doc = await Event.findOne({ slug: slug.toLowerCase() });
  return doc ? mapEventToDto(doc) : null;
}

