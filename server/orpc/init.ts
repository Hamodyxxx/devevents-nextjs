import { os } from '@orpc/server';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';
import { withDbProviderMiddleware } from '../middlewares/with-db-provider-middleware';

export const base = os
    .use(errorHandlerMiddleware)
    .use(withDbProviderMiddleware);