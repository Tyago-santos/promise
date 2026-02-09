import { createFileRoute } from "@tanstack/react-router";

import HeaderPefil from "@/components/HeaderPerfil";
import InforPerfil from "@/components/InforPerfil";
import { posts } from "@/api";

export const Route = createFileRoute("/__private/perfil/")({
  component: RouteComponent,
});

function RouteComponent() {
  console.log(posts);
  return (
    <div>
      <HeaderPefil />
      <InforPerfil posts={posts} path="/perfil/$perfil" />
    </div>
  );
}
