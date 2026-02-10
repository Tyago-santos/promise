import { createFileRoute } from "@tanstack/react-router";

import HeaderPerfil from "@/components/HeaderPerfil";
import InforPerfil from "@/components/InforPerfil";
import { posts } from "@/api";

export const Route = createFileRoute("/__private/perfil/")({
  component: RouteComponent,
});

function RouteComponent() {
  console.log(posts);
  return (
    <div>
      <HeaderPerfil name="Tiago dos Santos" />
      <InforPerfil posts={posts} path="/perfil/$perfil" />
    </div>
  );
}
