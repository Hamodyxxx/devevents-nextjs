
import { generateSlug, normalizeDate, normalizeTime } from '@/lib/formatters';
import {
  type CreateEventInput,
  type EventDto,
  mapEventToDto,
} from '../event-dtos';
import prisma from '@/lib/db/db';

export async function createEvent(input: CreateEventInput): Promise<EventDto> {
  const doc = await prisma.event.create({
    data: {
      ...input,
      slug: generateSlug(input.title),
      date: normalizeDate(input.date),
      time: normalizeTime(input.time),
      mode: input.mode,
    },
  });

  return mapEventToDto(doc);
}