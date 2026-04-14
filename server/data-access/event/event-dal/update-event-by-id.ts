import { generateSlug, normalizeDate, normalizeTime } from "@/lib/formatters";
import { Prisma } from "@/server/prisma/client";
import { EventDto, mapEventToDto, UpdateEventInput } from "../event-dtos";
import prisma from "@/lib/db/db";

export async function updateEventById(id: string, patch: UpdateEventInput): Promise<EventDto | null> {
  const data: Prisma.EventUpdateInput = { ...patch } as any;
  if (patch.title) data.slug = generateSlug(patch.title);
  if (patch.date) data.date = normalizeDate(patch.date);
  if (patch.time) data.time = normalizeTime(patch.time);

  try {
    const doc = await prisma.event.update({
      where: { id },
      data,
    });
    return mapEventToDto(doc);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2025') return null;
    throw error;
  }
}