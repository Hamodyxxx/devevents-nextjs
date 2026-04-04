import { z } from 'zod';

import { ObjectIdStringSchema } from '@/server/data-access/_shared';

export const CreateBookingInputSchema = z.object({
  eventId: ObjectIdStringSchema,
  email: z.email(),
});

export type CreateBookingInput = z.infer<typeof CreateBookingInputSchema>;

