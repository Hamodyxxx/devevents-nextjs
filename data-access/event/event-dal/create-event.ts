import Event from '@/database/event.model';

import {
  CreateEventInputSchema,
  type CreateEventInput,
  type EventDto,
  mapEventToDto,
} from '../event-dtos';

/**
 * Create a new event record from the provided event data and return its DTO representation.
 *
 * @param input - Event data to persist
 * @returns The created event as an EventDto
 */
export async function createEvent(input: CreateEventInput): Promise<EventDto> {
  const parsed = CreateEventInputSchema.parse(input);
  const doc = await Event.create(parsed);
  return mapEventToDto(doc);
}

