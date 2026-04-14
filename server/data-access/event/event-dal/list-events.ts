import { Prisma } from "@/app/generated/prisma/client";
import { EventDto, mapEventToDto } from "../event-dtos";
import prisma from "@/lib/db/db";

export async function listEvents(args: {
  where?: Prisma.EventWhereInput;
  limit?: number;
  page?: number;
} = {}): Promise<{ data: EventDto[]; hasNextPage: boolean }> {
  const { where = {}, limit = 10, page = 1 } = args;
  const skip = (page - 1) * limit;

  const docs = await prisma.event.findMany({
    where,
    take: limit + 1,
    skip,
    orderBy: [{ date: 'asc' }, { time: 'asc' }],
  });

  const hasNextPage = docs.length > limit;
  const data = hasNextPage ? docs.slice(0, limit) : docs;

  return {
    data: data.map(mapEventToDto),
    hasNextPage,
  };
}