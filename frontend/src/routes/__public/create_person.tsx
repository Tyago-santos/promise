import { createFileRoute } from "@tanstack/react-router";
import { CreatePersonPage } from "@/features/auth";

export const Route = createFileRoute("/__public/create_person")({
  component: CreatePersonPage,
  beforeLoad: () => ({
    head: {
      meta: [
        {
          title: "Criar Perfil | Promise",
          description: "Crie seu perfil na plataforma Promise",
          keywords: "Criar  perfil, autenticação, promise",
        },
      ],
    },
  }),
});
