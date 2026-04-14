import { z } from 'zod';
import { EventDtoSchema } from './event.dto';


export const CreateEventInputSchema = EventDtoSchema.omit({ 
  id: true, createdAt: true, updatedAt: true, bookingCount: true, slug: true 
});
export type CreateEventInput = z.infer<typeof CreateEventInputSchema>;

export const UpdateEventInputSchema = CreateEventInputSchema.partial();
export type UpdateEventInput = z.infer<typeof UpdateEventInputSchema>;