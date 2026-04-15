import { EventDtoSchema, type EventDto } from './event.dto';
import { Prisma } from '@/app/generated/prisma/client';


export function mapEventToDto(events: Prisma.EventGetPayload<{}>): EventDto {
  return EventDtoSchema.parse({
    ...events,
    createdAt: events.createdAt.toISOString(),
    updatedAt: events.updatedAt.toISOString(),
  });
}