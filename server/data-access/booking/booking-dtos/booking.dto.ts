import { z } from 'zod';

export const BookingDtoSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  email: z.email(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type BookingDto = z.infer<typeof BookingDtoSchema>;

