import { Prisma } from "@/server/prisma/client";
import { EventDto, mapEventToDto } from "../event-dtos";
import prisma from "@/lib/db/db";

export async function incrementEventBookingCount(id: string, delta: number): Promise<EventDto | null> {
  try {
    const doc = await prisma.event.update({
      where: { id },
      data: { bookingCount: { increment: delta } },
    });
    return mapEventToDto(doc);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2025') return null;
    throw error;
  }
}