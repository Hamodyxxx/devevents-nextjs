import { CreateEventInput, getEventById, listEvents, updateEventById, UpdateEventInput } from "../data-access";
import { createEvent } from "../data-access/event/event-dal/create-event";

export async function createEventService(input: CreateEventInput) {
  return await createEvent(input);
}

export async function updateEventService(id: string, patch: UpdateEventInput) {
  return await updateEventById(id, patch);
}

/**
 * Business Logic: Get "Related" events.
 * We use the DAL to find events with similar tags, excluding the current one.
 */
export async function getRelatedEventsService(id: string, limit = 3) {
  const currentEvent = await getEventById(id);
  if (!currentEvent || currentEvent.tags.length === 0) return [];

  const { data } = await listEvents({
    where: {
      id: { not: id },
      tags: { hasSome: currentEvent.tags },
    },
    limit,
  });

  return data;
}