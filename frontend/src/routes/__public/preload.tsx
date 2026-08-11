import { createFileRoute, redirect } from "@tanstack/react-router";
import { PreloadPage, isAuthenticated } from "@/features/auth";

export const Route = createFileRoute("/__public/preload")({
  component: PreloadPage,

  beforeLoad: () => {
    if (isAuthenticated())
      throw redirect({
        to: "/",
        replace: true,
      });

    return {
      head: {
        meta: [
          {
            title: "Preload | Promise",
            description: "Faça cadastro na plataforma Promise",
            keywords: "cadastro, autenticação, promise",
          },
        ],
      },
    };
  },
});
