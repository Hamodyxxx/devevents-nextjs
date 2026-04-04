import { z } from 'zod';

export const ObjectIdStringSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

export const IsoDateTimeStringSchema = z.string().datetime();

