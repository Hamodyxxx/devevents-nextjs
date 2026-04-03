import { z } from 'zod';

export const CreateEventInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  overview: z.string().min(1),
  image: z.string().min(1),
  venue: z.string().min(1),
  location: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  mode: z.string().min(1),
  audience: z.string().min(1),
  agenda: z.array(z.string()).min(1),
  organizer: z.string().min(1),
  tags: z.array(z.string()).min(1),
});

export type CreateEventInput = z.infer<typeof CreateEventInputSchema>;

export const UpdateEventInputSchema = CreateEventInputSchema.partial();
export type UpdateEventInput = z.infer<typeof UpdateEventInputSchema>;

