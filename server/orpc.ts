import { implement } from "@orpc/server";
import { contract } from "./contract";
import { errorHandlerMiddleware } from "./middlewares/error-handler-middleware";

const os = implement(contract);

export const base = os
    .use(errorHandlerMiddleware)
