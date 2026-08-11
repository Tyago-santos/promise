import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/features/auth";
import { EditProfilePage } from "@/features/profile";

export const Route = createFileRoute("/__private/perfil/edit_perfil")({
  component: EditProfilePage,
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
            title: "Edite Perfil | Promise",
            description: "Faça cadastro na plataforma Promise",
            keywords: "cadastro, autenticação, promise",
          },
        ],
      },
    };
  },
});
