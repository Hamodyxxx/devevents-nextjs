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

/**
 * Create a booking for an event using a user's email.
 *
 * @param eventId - The event ID string to associate the booking with
 * @param email - The user's email address for the booking
 * @returns The created booking object
 * @throws BadRequestError - if `eventId` is not a valid ID string
 * @throws BadRequestError - if `email` is not a valid email
 * @throws BadRequestError - if a booking already exists for the given event and email
 */
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
