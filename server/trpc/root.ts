import { bookingRouter } from '../routes/bookings';
import { createRouter } from './init';

export const appRouter = createRouter({
    booking: bookingRouter,
    
});

export type AppRouter = typeof appRouter;
