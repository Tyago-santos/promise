import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadManager } from "@/components/HeadManager";
import Header from "../components/Header";
import { useEffect, useState } from "react";
export const Route = createRootRoute({
  component: App,
});

export default function App() {
  const [headerShow, setHeaderShow] = useState(true);
  const location = useLocation();
  const hiddenRoutes = ["/perfil", "/register"];

  useEffect(() => {
    const vefifyRoute = () => {
      console.log(location.pathname);
      if (hiddenRoutes.includes(location.pathname)) setHeaderShow(false);
    };

    vefifyRoute();
  });

  return (
    <>
      <HeadManager />

      {headerShow && <Header />}
      <Outlet />

      {/* <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      /> */}
    </>
  );
}
