import { formatError } from "@/lib/errors/format-error";
import { normalizeError } from "@/lib/errors/normalize-error";
import { ORPCErrorCode } from "@orpc/client";
import { ORPCError } from "@orpc/server";
import { os } from "@orpc/server";


function mapHttpStatusToOrpcCode(status: number): ORPCErrorCode {
    if (status === 401) return 'UNAUTHORIZED';
    if (status === 403) return 'FORBIDDEN';
    if (status === 404) return 'NOT_FOUND';
    if (status === 409) return 'CONFLICT';
    if (status >= 400 && status < 500) return 'BAD_REQUEST';
    
    return 'INTERNAL_SERVER_ERROR';
}

export const errorHandlerMiddleware = os.middleware(async ({ next }) => {
    try {
        return await next();
    } catch (err) {
        if (err instanceof ORPCError) throw err;

        const normalized = normalizeError(err);
        
        const formatted = formatError(normalized);
        
        const orpcCode = mapHttpStatusToOrpcCode(normalized.statusCode);

        throw new ORPCError(orpcCode, {
            message: formatted.message,
            data: formatted,
        });
    }
});
