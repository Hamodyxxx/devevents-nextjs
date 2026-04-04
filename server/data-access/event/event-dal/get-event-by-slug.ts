import Event from '@/server/database/event.model';

import { type EventDto, mapEventToDto } from '../event-dtos';

/**
 * Retrieve an event by its URL slug (case-insensitive) and convert it to an EventDto.
 *
 * @param slug - The event's URL slug to match (matching is performed case-insensitively)
 * @returns The matching `EventDto` if found, `null` if no event matches the slug
 */
export async function getEventBySlug(slug: string): Promise<EventDto | null> {
  const doc = await Event.findOne({ slug: slug.toLowerCase() });
  return doc ? mapEventToDto(doc) : null;
}

