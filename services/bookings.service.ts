import dbConnect from '@/lib/mongo';
import Booking, { IBooking } from '@/database/booking.model';
import Event from '@/database/event.model';
import { BadRequestError } from '@/lib/errors/app-error';
import mongoose from 'mongoose';

interface CreateBookingParams {
  eventId: string;
  email: string;
}

export async function createBookingByEmailService({ eventId, email }: CreateBookingParams) {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    throw new BadRequestError('Invalid event ID format');
  }

  const existingBooking = await Booking.findOne({ eventId, email });
  if (existingBooking) {
    throw new BadRequestError('You have already booked this event');
  }

  const newBooking = await Booking.create({ eventId, email });
  
  await Event.findByIdAndUpdate(eventId, { $inc: { bookingCount: 1 } });

  return newBooking as IBooking;
}
