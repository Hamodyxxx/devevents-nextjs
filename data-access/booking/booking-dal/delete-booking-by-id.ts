import Booking from '@/database/booking.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

/**
 * Deletes a booking with the given string identifier.
 *
 * @param id - The booking's string identifier; must be a valid MongoDB ObjectId string
 * @returns `true` if exactly one document was deleted, `false` otherwise
 * @throws If `id` is not a valid ObjectId string or if the deletion operation fails
 */
export async function deleteBookingById(id: string): Promise<boolean> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const res = await Booking.deleteOne({ _id: parsedId });
  return res.deletedCount === 1;
}

