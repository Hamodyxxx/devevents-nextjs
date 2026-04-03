import Event from '@/database/event.model';
import { ObjectIdStringSchema } from '@/data-access/_shared';

import {
  CreateEventInputSchema,
  type CreateEventInput,
  type EventDto,
  mapEventToDto,
  UpdateEventInputSchema,
  type UpdateEventInput,
} from './event-dtos';

export class EventDal {
  async getById(id: string): Promise<EventDto | null> {
    const parsedId = ObjectIdStringSchema.parse(id);
    const doc = await Event.findById(parsedId);
    return doc ? mapEventToDto(doc) : null;
  }

  async getBySlug(slug: string): Promise<EventDto | null> {
    const doc = await Event.findOne({ slug: slug.toLowerCase() });
    return doc ? mapEventToDto(doc) : null;
  }

  async list(where: Record<string, unknown> = {}): Promise<EventDto[]> {
    const docs = await Event.find(where as never).sort({ date: 1, time: 1 });
    return docs.map(mapEventToDto);
  }

  async create(input: CreateEventInput): Promise<EventDto> {
    const parsed = CreateEventInputSchema.parse(input);
    const doc = await Event.create(parsed);
    return mapEventToDto(doc);
  }

  async updateById(id: string, patch: UpdateEventInput): Promise<EventDto | null> {
    const parsedId = ObjectIdStringSchema.parse(id);
    const parsedPatch = UpdateEventInputSchema.parse(patch);
    const doc = await Event.findByIdAndUpdate(parsedId, parsedPatch, {
      new: true,
      runValidators: true,
    });
    return doc ? mapEventToDto(doc) : null;
  }

  async deleteById(id: string): Promise<boolean> {
    const parsedId = ObjectIdStringSchema.parse(id);
    const res = await Event.deleteOne({ _id: parsedId });
    return res.deletedCount === 1;
  }

  async incrementBookingCount(eventId: string, delta: number): Promise<EventDto | null> {
    const parsedId = ObjectIdStringSchema.parse(eventId);
    const doc = await Event.findByIdAndUpdate(parsedId, { $inc: { bookingCount: delta } }, { new: true });
    return doc ? mapEventToDto(doc) : null;
  }
}

