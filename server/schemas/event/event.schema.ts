import { IsoDateTimeStringSchema, ObjectIdStringSchema } from "@/server/data-access";
import z from "zod";

export const EventSchema = z.object({
    id: ObjectIdStringSchema, 
    
    title: z.string()
      .min(1, "Title is required")
      .max(100, "Title cannot exceed 100 characters")
      .trim(),
      
    slug: z.string().lowercase().trim().optional(),
    
    description: z.string()
      .min(1, "Description is required")
      .max(1000, "Description cannot exceed 1000 characters")
      .trim(),
      
    overview: z.string()
      .min(1, "Overview is required")
      .max(500, "Overview cannot exceed 500 characters")
      .trim(),
      
    image: z.url("Invalid image URL").trim(),
    
    venue: z.string().min(1, "Venue is required").trim(),
    
    location: z.string().min(1, "Location is required").trim(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
    
    time: z.string().min(1, "Time is required"),
    
    mode: z.enum(['online', 'offline', 'hybrid'], {
      error: "Mode must be either online, offline, or hybrid"
    }),
    
    audience: z.string().min(1, "Audience is required").trim(),
    
    agenda: z.array(z.string())
      .min(1, "At least one agenda item is required"),
      
    organizer: z.string().min(1, "Organizer is required").trim(),
    
    tags: z.array(z.string())
      .min(1, "At least one tag is required"),
      
    bookingCount: z.number().int().nonnegative().default(0),
    
    createdAt: IsoDateTimeStringSchema,
    updatedAt: IsoDateTimeStringSchema,
});