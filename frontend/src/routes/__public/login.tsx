import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/features/auth";

export const Route = createFileRoute("/__public/login")({
  component: LoginPage,
  beforeLoad: () => ({
    head: {
      meta: [
        {
          title: "Login | Promise",
          description: "Faça login na plataforma Promise",
          keywords: "login, autenticação, promise",
        },
      ],
    },
  }),
});
