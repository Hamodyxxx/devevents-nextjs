import prisma from '@/lib/db/db';

export async function deleteEventById(id: string): Promise<boolean> {
  try {
    await prisma.event.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}