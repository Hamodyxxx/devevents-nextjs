import Event from '@/database/event.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

export async function deleteEventById(id: string): Promise<boolean> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const res = await Event.deleteOne({ _id: parsedId });
  return res.deletedCount === 1;
}

