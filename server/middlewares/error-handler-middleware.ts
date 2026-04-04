import { formatError } from "@/lib/errors/format-error";
import { normalizeError } from "@/lib/errors/normalize-error";
import { TRPCError } from "@trpc/server";
import type { t as tType } from "../trpc/init";

function mapHttpStatusToTrpcCode(status: number): TRPCError['code'] {
    if (status >= 400 && status < 500) {
        if (status === 401) return 'UNAUTHORIZED';
        if (status === 403) return 'FORBIDDEN';
        if (status === 404) return 'NOT_FOUND';
        if (status === 409) return 'CONFLICT';
        return 'BAD_REQUEST';
    }
    return 'INTERNAL_SERVER_ERROR';
}

export const errorHandlerMiddleware = (trpc: typeof tType) => trpc.middleware(async ({ next, path }) => {
    const result = await next();
  
    if (result.ok) return result;

    const normalized = normalizeError(result.error);
    const formatted = formatError(normalized);
    const trpcCode = mapHttpStatusToTrpcCode(normalized.statusCode);

    throw new TRPCError({
        code: trpcCode,
        message: formatted.message,
        cause: formatted, 
    });
});
