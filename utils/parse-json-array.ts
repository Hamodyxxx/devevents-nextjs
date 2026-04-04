import { BadRequestError } from "@/lib/errors/app-error";
import { tryCatch } from "@/lib/try-catch";

export const parseJsonArray = (value: string, field: string) => {
    const result = tryCatch(() => JSON.parse(value || "[]"));
    if (result.error || !Array.isArray(result.data)) {
        throw new BadRequestError(`${field} must be a JSON array`);
    }
    return result.data as string[];
};