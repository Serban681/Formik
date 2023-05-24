import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/routers/root';

function getBaseUrl() {
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            return {
                
            };
          },
        }),
      ],
    };
  },

  ssr: false,
});