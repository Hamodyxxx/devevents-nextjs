import Event from '@/server/database/event.model';

import {
  CreateEventInputSchema,
  type CreateEventInput,
  type EventDto,
  mapEventToDto,
} from '../event-dtos';

/**
 * Create a new Event record from the provided input and return its DTO representation.
 *
 * @param input - Properties for the new event; must satisfy the `CreateEventInput` schema
 * @returns The created event represented as an `EventDto`
 */
export async function createEvent(input: CreateEventInput): Promise<EventDto> {
  const parsed = CreateEventInputSchema.parse(input);
  const doc = await Event.create(parsed);
  return mapEventToDto(doc);
}

