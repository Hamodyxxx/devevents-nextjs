import { z } from 'zod';
import Booking from '@/database/booking.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';
import {
  CreateBookingInputSchema,
  type CreateBookingInput,
  type BookingDto,
  mapBookingToDto,
} from './booking-dtos';

export class BookingDal {
  async getById(id: string): Promise<BookingDto | null> {
    const parsedId = ObjectIdStringSchema.parse(id);
    const doc = await Booking.findById(parsedId);
    return doc ? mapBookingToDto(doc) : null;
  }

  async list(where: Record<string, unknown> = {}): Promise<BookingDto[]> {
    const docs = await Booking.find(where as never).sort({ createdAt: -1 });
    return docs.map(mapBookingToDto);
  }

  async listByEvent(eventId: string): Promise<BookingDto[]> {
    const parsedEventId = ObjectIdStringSchema.parse(eventId);
    const docs = await Booking.find({ eventId: parsedEventId }).sort({ createdAt: -1 });
    return docs.map(mapBookingToDto);
  }

  async listByEmail(email: string): Promise<BookingDto[]> {
    const parsedEmail = z.string().email().parse(email).toLowerCase();
    const docs = await Booking.find({ email: parsedEmail }).sort({ createdAt: -1 });
    return docs.map(mapBookingToDto);
  }

  async create(input: CreateBookingInput): Promise<BookingDto> {
    const parsed = CreateBookingInputSchema.parse(input);
    const doc = await Booking.create({
      eventId: parsed.eventId,
      email: parsed.email.toLowerCase(),
    });
    return mapBookingToDto(doc);
  }

  async deleteById(id: string): Promise<boolean> {
    const parsedId = ObjectIdStringSchema.parse(id);
    const res = await Booking.deleteOne({ _id: parsedId });
    return res.deletedCount === 1;
  }
}

