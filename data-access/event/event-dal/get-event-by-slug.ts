import Event from '@/database/event.model';

import { type EventDto, mapEventToDto } from '../event-dtos';

export async function getEventBySlug(slug: string): Promise<EventDto | null> {
  const doc = await Event.findOne({ slug: slug.toLowerCase() });
  return doc ? mapEventToDto(doc) : null;
}

