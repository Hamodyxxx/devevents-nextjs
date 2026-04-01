import { AppError, BadRequestError } from "./app-error";

export function normalizeError(err: unknown): AppError {
  if (err instanceof AppError) return err;

//   if (err instanceof ZodError) {
//     const message = err.errors.map(e => e.message).join(", ");
//     return new AppError(`Validation Error: ${message}`, 400);
//   }

  if (isMongooseCastError(err)) {
    return new BadRequestError("Invalid ID format");
  }

  if (isMongoDuplicateKey(err)) {
    return new BadRequestError("Duplicate field value");
  }

  if (err instanceof Error) {
    return new AppError(err.message || "Something went wrong", 500);
  }

  return new AppError("Unknown error occurred", 500);
}

function isMongooseCastError(err: any) {
  return err?.name === "CastError";
}

function isMongoDuplicateKey(err: any) {
  return err?.code === 11000;
}