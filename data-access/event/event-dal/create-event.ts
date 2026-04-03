import Event from '@/database/event.model';

import {
  CreateEventInputSchema,
  type CreateEventInput,
  type EventDto,
  mapEventToDto,
} from '../event-dtos';

export async function createEvent(input: CreateEventInput): Promise<EventDto> {
  const parsed = CreateEventInputSchema.parse(input);
  const doc = await Event.create(parsed);
  return mapEventToDto(doc);
}

