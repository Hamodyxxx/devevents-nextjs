import dbConnect from '@/lib/mongo';
import { BadRequestError } from '@/lib/errors/app-error';
import {
  createBooking,
  CreateBookingInputSchema,
  deleteBookingById,
  incrementEventBookingCount,
  listBookings,
  ObjectIdStringSchema,
} from '@/server/data-access';
import { withSessionTransaction, withUndoAfter } from '@/utils/with-session-transaction';

interface CreateBookingParams {
  eventId: string;
  email: string;
}

/**
 * Create a booking for an event using the provided email.
 *
 * Validates `eventId` and `email`, prevents duplicate bookings for the same event/email,
 * increments the event's booking counter, and returns the newly created booking record.
 *
 * @param eventId - The event identifier string to book
 * @param email - The purchaser's email address
 * @returns The created booking record
 * @throws BadRequestError - If `eventId` has an invalid format
 * @throws BadRequestError - If `email` has an invalid format
 * @throws BadRequestError - If a booking already exists for the given event and email
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

  const input = {
    eventId: parsedEventId.data,
    email: parsedEmail.data,
  };

  return withSessionTransaction({
    work: async (session) => {
      const created = await createBooking(input, session);
      await incrementEventBookingCount(parsedEventId.data, 1, session);
      return created;
    },
    onUnsupported: () =>
      withUndoAfter({
        first: () => createBooking(input),
        after:  async () => {
          await incrementEventBookingCount(parsedEventId.data, 1);
        },
        undo: async (created) => {
          await deleteBookingById(created.id);
        }
      }),
  });
}
