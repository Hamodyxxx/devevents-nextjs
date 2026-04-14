import z from "zod";

export const EventCoreSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(1000),
  overview: z.string().min(1, "Overview is required").max(500),
  image: z.url("Invalid image URL"),
  venue: z.string().min(1, "Venue is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format"),
  time: z.string().min(1, "Time is required"),
  mode: z.enum(['online', 'offline', 'hybrid']),
  audience: z.string().min(1, "Audience is required"),
  agenda: z.array(z.string()).min(1, "At least one agenda item is required"),
  organizer: z.string().min(1, "Organizer is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export type EventCorse = z.infer<typeof EventCoreSchema>