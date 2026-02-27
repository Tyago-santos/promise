import {
  Link,
  Outlet,
  // createRootRoute,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { HeadManager } from "@/components/HeadManager";

import type { RouterContext } from "@/main";
export const Route = createRootRouteWithContext<RouterContext>()({
  component: App,

  notFoundComponent: () => (
    <div className="text-center p-10">
      <h1>404 - Página não encontrada</h1>
      <p>Desculpe, a página que você procura não existe.</p>
      <Link to="/" className="text-blue-500">
        Voltar para a Home
      </Link>
    </div>
  ),
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
