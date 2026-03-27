import { NextResponse } from "next/server";
import { normalizeError } from "./normalize-error";
import { formatError } from "./format-error";

export function withErrorHandlerApi<T extends (...args: any[]) => any>(
  handler: T
) {
  return async (...args: Parameters<T>) => {
    try {
      return await handler(...args);
    } catch (err) {
      const error = normalizeError(err);
      const formatted = formatError(error);

      return NextResponse.json(formatted, {
        status: error.statusCode || 500,
      });
    }
  };
}



export function withErrorHandlerAction<T extends (...args: any[]) => any>(
  action: T
) {
  return async (...args: Parameters<T>) => {
    try {
      return await action(...args);
    } catch (err) {
      const error = normalizeError(err);
      const formatted = formatError(error);

      throw formatted;
    }
  };
}