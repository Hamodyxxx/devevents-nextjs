import { z } from 'zod';

import { IsoDateTimeStringSchema, ObjectIdStringSchema } from '@/data-access/_shared';

export const BookingDtoSchema = z.object({
  id: ObjectIdStringSchema,
  eventId: ObjectIdStringSchema,
  email: z.email(),
  createdAt: IsoDateTimeStringSchema,
  updatedAt: IsoDateTimeStringSchema,
});

export type BookingDto = z.infer<typeof BookingDtoSchema>;

