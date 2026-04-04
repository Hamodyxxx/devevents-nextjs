import Event from '@/server/database/event.model';
import { ObjectIdStringSchema } from '@/server/data-access/_shared';

import {
  type EventDto,
  mapEventToDto,
  UpdateEventInputSchema,
  type UpdateEventInput,
} from '../event-dtos';

/**
 * Updates an Event document by its MongoDB ID and returns the updated event mapped to EventDto, or `null` if no document was found.
 *
 * @param id - The event's MongoDB ObjectId as a string; validated before use
 * @param patch - Partial event fields to apply; validated against the update input schema
 * @returns The updated event as an `EventDto` if found and updated, `null` if no document matched `id`
 * @throws ValidationError if `id` or `patch` fail schema validation
 * @throws Any database error raised by the underlying update operation
 */
export async function updateEventById(id: string, patch: UpdateEventInput): Promise<EventDto | null> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const parsedPatch = UpdateEventInputSchema.parse(patch);
  const doc = await Event.findById(parsedId);
  if (!doc) return null;

  // findByIdAndUpdate bypasses pre('save') hooks; load + set + save so slug/date/time
  // normalization in database/event.model.ts runs.
  doc.set(parsedPatch);
  await doc.save();
  return mapEventToDto(doc);
}

