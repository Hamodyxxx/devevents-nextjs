import { implement, ORPCError } from "@orpc/server";
import { ORPCErrorCode } from "@orpc/client";
import { contract } from "../contract";
import { normalizeError } from "@/lib/errors/normalize-error";
import { formatError } from "@/lib/errors/format-error";

function mapHttpStatusToOrpcCode(status: number) {
    if (status === 401) return 'UNAUTHORIZED';
    if (status === 403) return 'FORBIDDEN';
    if (status === 404) return 'NOT_FOUND';
    if (status === 409) return 'CONFLICT';
    if (status >= 400 && status < 500) return 'BAD_REQUEST';
    
    return 'INTERNAL_SERVER_ERROR';
}

const os = implement(contract);

export const errorHandlerMiddleware = os.middleware(async ({ next, errors }) => {
    try {
        return await next();
    } catch (err) {
        if (err instanceof ORPCError) throw err;

        const normalized = normalizeError(err);
        
        const formatted = formatError(normalized);
        
        const orpcCode = mapHttpStatusToOrpcCode(normalized.statusCode);
        
        throw errors[orpcCode]({
            data: formatted
        })
    }
});