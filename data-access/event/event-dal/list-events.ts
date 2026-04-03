import Event from '@/database/event.model';

import { type EventDto, mapEventToDto } from '../event-dtos';

export async function listEvents(where: Record<string, unknown> = {}): Promise<EventDto[]> {
  const docs = await Event.find(where as never).sort({ date: 1, time: 1 });
  return docs.map(mapEventToDto);
}

