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
  const doc = await Event.findByIdAndUpdate(parsedId, parsedPatch, {
    new: true,
    runValidators: true,
  });
  return doc ? mapEventToDto(doc) : null;
}

