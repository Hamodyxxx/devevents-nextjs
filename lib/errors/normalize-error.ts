import { Prisma } from "@/app/generated/prisma/client";
import { AppError, ConflictError, NotFoundError } from "./app-error";

export function normalizeError(err: unknown) {
  if (err instanceof AppError) return err;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return new ConflictError("A record with this value already exists.");
    }
    if (err.code === 'P2025') {
      return new NotFoundError("The requested record was not found.");
    }
  }

  const message = err instanceof Error ? err.message : "An unexpected error occurred";
  return new AppError(message, 500, 'INTERNAL_SERVER_ERROR');
}