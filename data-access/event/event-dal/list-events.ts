import Event from '@/database/event.model';

import { type EventDto, mapEventToDto } from '../event-dtos';

/**
 * Retrieve events matching an optional filter, sorted by `date` then `time`, and return them as `EventDto` objects.
 *
 * @param where - Optional filter object (MongoDB-style) to select which events to query; defaults to all events.
 * @returns An array of events converted to `EventDto`, sorted by `date` ascending then `time` ascending.
 */
export async function listEvents(where: Record<string, unknown> = {}): Promise<EventDto[]> {
  const docs = await Event.find(where as never).sort({ date: 1, time: 1 });
  return docs.map(mapEventToDto);
}

