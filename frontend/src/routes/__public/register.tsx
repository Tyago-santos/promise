import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "@/features/auth";

export const Route = createFileRoute("/__public/register")({
  component: RegisterPage,
  beforeLoad: () => ({
    head: {
      meta: [
        {
          title: "Cadastro | Promise",
          description: "Faça cadastro na plataforma Promise",
          keywords: "cadastro, autenticação, promise",
        },
      ],
    },
  }),
});
