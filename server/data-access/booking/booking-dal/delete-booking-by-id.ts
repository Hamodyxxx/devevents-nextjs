import prisma from '@/lib/db/db';

/**
 * Delete the booking identified by the given string id.
 *
 * @param id - The booking's string identifier
 * @returns `true` if a document was deleted, `false` otherwise
 */
export async function deleteBookingById(id: string): Promise<boolean> {
  try {
    await prisma.booking.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}