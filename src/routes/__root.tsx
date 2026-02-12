import {
  Outlet,
  // createRootRoute,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { HeadManager } from "@/components/HeadManager";

import type { RouterContext } from "@/main";
export const Route = createRootRouteWithContext<RouterContext>()({
  component: App,
});

export default function App() {
  return (
    <>
      <HeadManager />
      <Outlet />
      {/* <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      /> */}
    </>
  );
}
