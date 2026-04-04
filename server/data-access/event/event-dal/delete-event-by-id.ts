import Event from '@/server/database/event.model';
import { ObjectIdStringSchema } from '@/server/data-access/_shared';

/**
 * Delete an Event document identified by its MongoDB `_id`.
 *
 * @param id - The Event's MongoDB ObjectId represented as a string; it will be validated.
 * @returns `true` if a document was deleted, `false` otherwise.
 * @throws If `id` is not a valid ObjectId string.
 */
export async function deleteEventById(id: string): Promise<boolean> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const res = await Event.deleteOne({ _id: parsedId });
  return res.deletedCount === 1;
}

