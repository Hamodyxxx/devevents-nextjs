import z from "zod";

export const EventDtoSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    overview: z.string(),
    image: z.string(),
    venue: z.string(),
    location: z.string(),
    date: z.string(),
    time: z.string(),
    mode: z.enum(['online', 'offline', 'hybrid']),
    audience: z.string(),
    agenda: z.array(z.string()),
    organizer: z.string(),
    tags: z.array(z.string()),
    bookingCount: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export type EventDto = z.infer<typeof EventDtoSchema>;