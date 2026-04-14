import { type EventDto, mapEventToDto } from '../event-dtos';
import prisma from '@/lib/db/db';


export async function getEventBySlug(slug: string): Promise<EventDto | null> {
  const doc = await prisma.event.findUnique({
    where: { slug: slug.toLowerCase() },
  });
  return doc ? mapEventToDto(doc) : null;
}