import Event from '@/server/database/event.model';
import { ObjectIdStringSchema } from '@/server/data-access/_shared';

import { type EventDto, mapEventToDto } from '../event-dtos';

/**
 * Retrieves an Event by its MongoDB ObjectId and returns it as an EventDto.
 *
 * @param id - The string representation of the Event's MongoDB ObjectId.
 * @returns The matching Event as an `EventDto`, or `null` if no document is found.
 */
export async function getEventById(id: string): Promise<EventDto | null> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const doc = await Event.findById(parsedId);
  return doc ? mapEventToDto(doc) : null;
}

