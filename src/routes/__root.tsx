import {
  Outlet,
  // createRootRoute,
  createRootRouteWithContext,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadManager } from "@/components/HeadManager";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import type { RouterContext } from "@/main";
export const Route = createRootRouteWithContext<RouterContext>()({
  component: App,
});

export default function App() {
  const [headerShow, setHeaderShow] = useState(true);
  const location = useLocation();
  const hiddenRoutes = [
    "/perfil",
    "/perfil/$perfil",
    "/contact/$chat",
    "/contact",
    "/login",
    "/register",
    "/preload",
    "/create_person",
  ];

  useEffect(() => {
    const vefifyRoute = () => {
      if (
        hiddenRoutes.includes(location.pathname) ||
        /\d/.test(location.href)
      ) {
        setHeaderShow(false);
      } else {
        setHeaderShow(true);
      }
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
