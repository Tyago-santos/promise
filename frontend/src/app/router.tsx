import { createRouter } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";

import { routeTree } from "@/routeTree.gen";
import { queryClient } from "@/app/providers";

export interface RouterContext {
  queryClient: QueryClient;
  media: MediaQueryList;
}

const media = window.matchMedia("(max-width: 768px)");

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    media,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface RouteContext {
    title?: string;
    head?: {
      meta?: Array<{
        title?: string;
        description?: string;
        keywords?: string;
        [key: string]: any;
      }>;
    };
  }
}
