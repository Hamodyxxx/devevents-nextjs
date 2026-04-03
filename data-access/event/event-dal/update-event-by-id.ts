import Event from '@/database/event.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import {
  type EventDto,
  mapEventToDto,
  UpdateEventInputSchema,
  type UpdateEventInput,
} from '../event-dtos';

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

