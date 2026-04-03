import Event from '@/database/event.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

/**
 * Deletes the Event document with the given MongoDB ObjectId string.
 *
 * @param id - The Event document's MongoDB ObjectId as a string.
 * @returns `true` if a single document was deleted, `false` otherwise.
 * @throws If `id` is not a valid ObjectId string.
 */
export async function deleteEventById(id: string): Promise<boolean> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const res = await Event.deleteOne({ _id: parsedId });
  return res.deletedCount === 1;
}

