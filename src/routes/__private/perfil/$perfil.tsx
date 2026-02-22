import { allProfiles, posts } from "@/api";
import HeaderPerfil from "@/components/HeaderPerfil";
import InforPerfil from "@/components/InforPerfil";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__private/perfil/$perfil")({
  component: PerfilApp,
  beforeLoad: () => ({
    head: {
      meta: [
        {
          title: "Perfil | Promise",
          description: "Faça cadastro na plataforma Promise",
          keywords: "cadastro, autenticação, promise",
        },
      ],
    },
  }),
});

export default function PerfilApp() {
  const { perfil } = Route.useParams();
  const id = +perfil;

  posts;

  const profile = allProfiles[id];

  return (
    <main>
      <HeaderPerfil name={profile.name} />
      <InforPerfil id={String(id)} inforPerfil={profile} posts={posts} />
    </main>
  );
}
