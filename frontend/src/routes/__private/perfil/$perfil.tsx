import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/features/auth";
import { ProfileDetailPage } from "@/features/profile";

export const Route = createFileRoute("/__private/perfil/$perfil")({
  component: RouteComponent,
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
            title: "Perfil | Promise",
            description: "Faça cadastro na plataforma Promise",
            keywords: "cadastro, autenticação, promise",
          },
        ],
      },
    };
  },
});

function RouteComponent() {
  const { perfil } = Route.useParams();
  return <ProfileDetailPage perfilId={perfil} />;
}
