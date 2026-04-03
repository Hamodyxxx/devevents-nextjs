import Event from '@/database/event.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import { type EventDto, mapEventToDto } from '../event-dtos';

export async function incrementEventBookingCount(eventId: string, delta: number): Promise<EventDto | null> {
  const parsedId = ObjectIdStringSchema.parse(eventId);
  const doc = await Event.findByIdAndUpdate(
    parsedId,
    { $inc: { bookingCount: delta } },
    { new: true }
  );
  return doc ? mapEventToDto(doc) : null;
}

