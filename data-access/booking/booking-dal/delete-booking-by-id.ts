import Booking from '@/database/booking.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

/**
 * Delete the booking identified by the given string id.
 *
 * @param id - The booking's string identifier
 * @returns `true` if a document was deleted, `false` otherwise
 */
export async function deleteBookingById(id: string): Promise<boolean> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const res = await Booking.deleteOne({ _id: parsedId });
  return res.deletedCount === 1;
}

