import { z } from 'zod';

import { IsoDateTimeStringSchema, ObjectIdStringSchema } from '@/data-access/_shared';

export const EventDtoSchema = z.object({
  id: ObjectIdStringSchema,
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  overview: z.string(),
  image: z.string(),
  venue: z.string(),
  location: z.string(),
  date: z.string(),
  time: z.string(),
  mode: z.string(),
  audience: z.string(),
  agenda: z.array(z.string()),
  organizer: z.string(),
  tags: z.array(z.string()),
  bookingCount: z.number(),
  createdAt: IsoDateTimeStringSchema,
  updatedAt: IsoDateTimeStringSchema,
});

export type EventDto = z.infer<typeof EventDtoSchema>;

