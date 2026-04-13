import { ObjectIdStringSchema } from "@/server/data-access";
import z from "zod";

export const BookEventByIdInput = z.object({ 
    eventId: ObjectIdStringSchema, 
    email: z.email()
})