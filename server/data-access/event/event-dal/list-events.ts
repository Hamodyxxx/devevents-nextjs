import Event from '@/server/database/event.model';

import { type EventDto, mapEventToDto } from '../event-dtos';

interface ListEventsArgs {
  where?: Record<string, unknown>
  limit?: number
  page?: number
}

/**
 * Retrieves events that match the provided filter and returns them as DTOs sorted by date then time.
 *
 * @param where - Query filter used to select events; defaults to an empty filter (all events)
 * @returns An array of EventDto objects for matching events, sorted ascending by `date` then `time`
 */
export async function listEvents({
  where = {},
  limit = 10,
  page = 1
}: ListEventsArgs): Promise<{
  data: EventDto[],
  hasNextPage: boolean
}> {
  const skip = (page - 1) * limit;

  const docs = await Event.find(where)
    .sort({ date: 1, time: 1 })
    .skip(skip)
    .limit(limit + 1) 
    .lean();

  const hasNextPage = docs.length > limit;

  const data = hasNextPage ? docs.slice(0, limit) : docs;

  return {
    data: data.map(mapEventToDto),
    hasNextPage
  };
}

