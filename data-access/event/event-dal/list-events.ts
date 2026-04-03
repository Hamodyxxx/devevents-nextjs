import Event from '@/database/event.model';

import { type EventDto, mapEventToDto } from '../event-dtos';

/**
 * Retrieves events that match the provided filter and returns them as DTOs sorted by date then time.
 *
 * @param where - Query filter used to select events; defaults to an empty filter (all events)
 * @returns An array of EventDto objects for matching events, sorted ascending by `date` then `time`
 */
export async function listEvents(where: Record<string, unknown> = {}): Promise<EventDto[]> {
  const docs = await Event.find(where as never).sort({ date: 1, time: 1 });
  return docs.map(mapEventToDto);
}

