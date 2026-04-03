import Event from '@/database/event.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import { type EventDto, mapEventToDto } from '../event-dtos';

export async function getEventById(id: string): Promise<EventDto | null> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const doc = await Event.findById(parsedId);
  return doc ? mapEventToDto(doc) : null;
}

