import { publicProcedure, router } from '../trpc';
import { forms } from './forms';
import { answers } from './answers';

export const appRouter = router({
  sayHi: publicProcedure.query(() => {
    return 'Hi from the server!'
  }),
  forms,
  answers
});

export type AppRouter = typeof appRouter;