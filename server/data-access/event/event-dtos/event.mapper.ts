import { EventDtoSchema, type EventDto } from './event.dto';
import { Prisma } from '@/server/prisma/client';


export function mapEventToDto(events: Prisma.EventGetPayload<{}>): EventDto {
  return EventDtoSchema.parse({
    ...events,
    createdAt: events.createdAt.toISOString(),
    updatedAt: events.updatedAt.toISOString(),
  });
}