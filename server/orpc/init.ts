import { os } from '@orpc/server';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';

export const base = os.use(errorHandlerMiddleware);