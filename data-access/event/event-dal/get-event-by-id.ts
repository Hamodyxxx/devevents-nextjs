import Event from '@/database/event.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import { type EventDto, mapEventToDto } from '../event-dtos';

/**
 * Fetches an event by its identifier and returns it as an EventDto.
 *
 * @param id - The event identifier string (parsed as an object ID)
 * @returns The corresponding `EventDto` if an event with `id` exists, `null` otherwise.
 */
export async function getEventById(id: string): Promise<EventDto | null> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const doc = await Event.findById(parsedId);
  return doc ? mapEventToDto(doc) : null;
}

