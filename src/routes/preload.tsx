import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/preload")({
  component: RouteComponent,

  //   loader: async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 8000));

  //     throw redirect({
  //       to: "/login",
  //       replace: true,
  //     });
  //   },
});

function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({
        to: "/login",
        replace: true,
      });
    }, 8000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <main className="flex items-center justify-cennter h-screen">
      <video muted autoPlay src="/video_promise.mp4"></video>
    </main>
  );
}
