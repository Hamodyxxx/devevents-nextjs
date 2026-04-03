import dbConnect from '@/lib/mongo';
import { BadRequestError } from '@/lib/errors/app-error';
import {
  createBooking,
  CreateBookingInputSchema,
  incrementEventBookingCount,
  listBookings,
  ObjectIdStringSchema,
} from '@/data-access';

interface CreateBookingParams {
  eventId: string;
  email: string;
}

export async function createBookingByEmailService({ eventId, email }: CreateBookingParams) {
  await dbConnect();

  const parsedEventId = ObjectIdStringSchema.safeParse(eventId);
  if (!parsedEventId.success) throw new BadRequestError('Invalid event ID format');

  const parsedEmail = CreateBookingInputSchema.shape.email.safeParse(email);
  if (!parsedEmail.success) throw new BadRequestError('Invalid email format');

  const existing = await listBookings({
    eventId: parsedEventId.data,
    email: parsedEmail.data.toLowerCase(),
  });

  if (existing.length > 0) throw new BadRequestError('You have already booked this event');

  const created = await createBooking({
    eventId: parsedEventId.data,
    email: parsedEmail.data,
  });

  await incrementEventBookingCount(parsedEventId.data, 1);

  return created;
}
