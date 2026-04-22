import Event from '@/database/event.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import { type EventDto, mapEventToDto } from '../event-dtos';

/**
 * Fetches an Event by its string ObjectId and returns a mapped representation.
 *
 * @param id - The Event's MongoDB ObjectId as a string
 * @returns The matching Event as an `EventDto`, `null` if no document is found
 */
export async function getEventById(id: string): Promise<EventDto | null> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const doc = await Event.findById(parsedId);
  return doc ? mapEventToDto(doc) : null;
}

