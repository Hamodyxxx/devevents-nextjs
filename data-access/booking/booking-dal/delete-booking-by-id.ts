import Booking from '@/database/booking.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

/**
 * Deletes a booking document identified by the given MongoDB `_id`.
 *
 * Validates `id` as an ObjectId string before deletion. Throws if `id` is invalid or if the database operation fails.
 *
 * @param id - The booking's `_id` as a string
 * @returns `true` if exactly one document was deleted, `false` otherwise
 */
export async function deleteBookingById(id: string): Promise<boolean> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const res = await Booking.deleteOne({ _id: parsedId });
  return res.deletedCount === 1;
}

