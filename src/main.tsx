import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";

export interface RouterContext {
  queryClient: QueryClient;
  media: MediaQueryList;
}

const media = window.matchMedia("(max-width: 768px)");

const queryClient = new QueryClient();

const router = createRouter({
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

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
