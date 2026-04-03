import Booking from '@/database/booking.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

export async function deleteBookingById(id: string): Promise<boolean> {
  const parsedId = ObjectIdStringSchema.parse(id);
  const res = await Booking.deleteOne({ _id: parsedId });
  return res.deletedCount === 1;
}

