import prisma from "@/lib/db/db";
import { CreateBookingInput } from "../data-access";
import { Prisma } from "../prisma/client";
import { BadRequestError } from "@/lib/errors/app-error";

export async function createBookingByEmailService(input: CreateBookingInput){
  const email = input.email.toLowerCase();

  try {
    return await prisma.$transaction(async (tx) => {
      const existing = await tx.booking.findUnique({
        where: {
          uniq_event_email: {
            eventId: input.eventId,
            email: email,
          },
        },
      });

      if (existing) {
        throw new BadRequestError('You have already booked this event');
      }

      const newBooking = await tx.booking.create({
        data: {
          eventId: input.eventId,
          email: email,
        },
      });


      const updatedEvent = await tx.event.update({
        where: { id: input.eventId },
        data: { bookingCount: { increment: 1 } },
      });

      if (!updatedEvent) {
        throw new BadRequestError('Event not found');
      }

      return {
        ...newBooking,
        createdAt: newBooking.createdAt.toISOString(),
        updatedAt: newBooking.updatedAt.toISOString(),
      };
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
      throw new BadRequestError('You have already booked this event');
    }
    
    if (error instanceof BadRequestError) throw error;
    
    console.error("Booking Service Error:", error);
    throw new Error("An unexpected error occurred during booking");
  }
}