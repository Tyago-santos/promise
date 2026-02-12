import {
  Outlet,
  // createRootRoute,
  createRootRouteWithContext,
  useLocation,
} from "@tanstack/react-router";
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
    "/match",
    "/search",
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
  }, [location.href, location.pathname]);

  return (
    <>
      <HeadManager />

      {headerShow && <Header />}
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
