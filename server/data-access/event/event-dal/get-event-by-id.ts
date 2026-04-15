import prisma from "@/lib/db/db";
import { EventDto, mapEventToDto } from "../event-dtos";

export async function getEventById(id: string): Promise<EventDto | null> {
  const doc = await prisma.event.findUnique({ where: { id } });
  return doc ? mapEventToDto(doc) : null;
}