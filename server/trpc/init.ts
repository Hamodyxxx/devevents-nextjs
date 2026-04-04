import { initTRPC } from '@trpc/server';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';

export const t = initTRPC.create();

const globalErrorHandling = errorHandlerMiddleware(t);

export const createRouter = t.router;
export const publicProcedure = t.procedure.use(globalErrorHandling);
export const middleware = t.middleware;