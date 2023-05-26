import { publicProcedure, router } from '../trpc';
import { forms } from './forms';

export const appRouter = router({
  sayHi: publicProcedure.query(() => {
    return 'Hi from the server!'
  }),
  forms
});

export type AppRouter = typeof appRouter;