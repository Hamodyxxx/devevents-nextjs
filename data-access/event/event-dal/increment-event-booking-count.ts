import Event from '@/database/event.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import { type EventDto, mapEventToDto } from '../event-dtos';

/**
 * Increment an event's bookingCount by a given amount and return the updated event.
 *
 * @param eventId - The event's ObjectId as a string; will be validated and parsed to an ObjectId (throws if invalid)
 * @param delta - The amount to add to `bookingCount` (may be negative to decrement)
 * @returns The updated `EventDto` if the event was found, `null` if no event with the given id exists
 */
export async function incrementEventBookingCount(eventId: string, delta: number): Promise<EventDto | null> {
  const parsedId = ObjectIdStringSchema.parse(eventId);
  const doc = await Event.findByIdAndUpdate(
    parsedId,
    { $inc: { bookingCount: delta } },
    { new: true }
  );
  return doc ? mapEventToDto(doc) : null;
}

