import { publicProcedure, router } from '../trpc';

export const appRouter = router({
  sayHi: publicProcedure.query(() => {
    return 'Hi from the server!'
  }),
});

export type AppRouter = typeof appRouter;