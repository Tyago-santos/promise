import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/__public/preload")({
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
  }, [navigate]);
  return (
    <main className="flex items-center justify-center h-full w-full">
      <video muted autoPlay src="/video_promise.mp4"></video>
    </main>
  );
}
