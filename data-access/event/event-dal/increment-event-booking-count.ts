import Event from '@/database/event.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import { type EventDto, mapEventToDto } from '../event-dtos';

/**
 * Increment the booking count for an event and return the updated event.
 *
 * Validates `eventId` as an ObjectId string before locating the event. `delta` may be negative to decrement the count.
 *
 * @param eventId - The event's ObjectId string to identify which event to update
 * @param delta - Amount to add to the event's booking count (use negative values to decrement)
 * @returns The updated `EventDto` after applying the delta, or `null` if no event was found
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

