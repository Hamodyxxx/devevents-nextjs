import { NextRequest, NextResponse } from "next/server";
import { AppError } from "../app-error";
import { Handler } from "./compose";


interface ErrorFallback {
  message?: string;
  data?: Record<string, unknown>;
}

type withErrorHandlerArgs = ErrorFallback | ((e: unknown) => ErrorFallback)

export function withErrorHandler(fallback?: withErrorHandlerArgs) {
  return (handler: Handler): Handler => {
    return async (req, ctx) => {
      try {
        return await handler(req, ctx);
      } catch (error ) {

        fallback = typeof fallback === "function" ? fallback(error) : fallback;

        if (error instanceof AppError) {
          return NextResponse.json(
            { error: fallback?.message ?? error.message, ...fallback?.data },
            { status: error.statusCode }
          );
        }

        console.error("[API Error]", error);
        return NextResponse.json(
          { error: fallback?.message ?? "Internal server error", ...fallback?.data },
          { status: 500 }
        );
      }
    };
  };
}