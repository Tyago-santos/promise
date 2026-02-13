import { allProfiles, posts } from "@/api";
import HeaderPerfil from "@/components/HeaderPerfil";
import InforPerfil from "@/components/InforPerfil";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__private/perfil/$perfil")({
  component: PerfilApp,
});

export default function PerfilApp() {
  const { perfil } = Route.useParams();
  const id = +perfil;

  posts;

  const profile = allProfiles[id];

  return (
    <main>
      <HeaderPerfil name={profile.name} />
      <InforPerfil inforPerfil={profile} posts={posts} />
    </main>
  );
}
