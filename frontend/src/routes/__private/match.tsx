import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/features/auth";
import { MatchPage } from "@/features/match";

export const Route = createFileRoute("/__private/match")({
  component: MatchPage,

  beforeLoad: () => {
    if (!isAuthenticated())
      throw redirect({
        to: "/preload",
        replace: true,
      });

    return {
      head: {
        meta: [
          {
            title: "Match | Promise",
            description: "Faça cadastro na plataforma Promise",
            keywords: "cadastro, autenticação, promise",
          },
        ],
      },
    };
  },
});
