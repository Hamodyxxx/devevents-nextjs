import { oc } from "@orpc/contract";

export const baseOc = oc.errors({
    BAD_REQUEST: {
        status: 400,
        message: "The request is invalid.",
    },
    UNAUTHORIZED: {
        status: 401,
        message: "Authentication is required.",
    },
    FORBIDDEN: {
        status: 403,
        message: "You do not have permission to perform this action.",
    },
    NOT_FOUND: {
        status: 404,
        message: "The requested resource was not found.",
    },
    CONFLICT: {
        status: 409,
        message: "A conflict occurred (e.g., duplicate entry).",
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: "An unexpected server error occurred.",
    },
});