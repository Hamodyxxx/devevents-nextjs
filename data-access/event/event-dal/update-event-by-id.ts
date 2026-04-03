import Event from '@/database/event.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import {
  type EventDto,
  mapEventToDto,
  UpdateEventInputSchema,
  type UpdateEventInput,
} from '../event-dtos';

/**
 * Update an event by its MongoDB ObjectId.
 *
 * @param id - The event's MongoDB ObjectId as a string; validated before use
 * @param patch - Partial event fields to apply; validated against the update input schema
 * @returns The updated `EventDto` if a document with `id` existed and was updated, `null` otherwise
 * @throws ValidationError if `id` or `patch` fail schema validation
 * @throws Error for any database-level error raised during the update operation
 */
export async function updateEventById(id: string, patch: UpdateEventInput): Promise<EventDto | null> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const parsedPatch = UpdateEventInputSchema.parse(patch);
  const doc = await Event.findByIdAndUpdate(parsedId, parsedPatch, {
    new: true,
    runValidators: true,
  });
  return doc ? mapEventToDto(doc) : null;
}

