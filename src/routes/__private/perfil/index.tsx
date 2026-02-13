import { createFileRoute } from "@tanstack/react-router";
import InforPerfilPrivate from "@/components/InforPerfilPrivate";
import HeaderPerfil from "@/components/HeaderPerfil";
import { posts } from "@/api";

export const Route = createFileRoute("/__private/perfil/")({
  component: RouteComponent,
});

function RouteComponent() {
  console.log(posts);
  return (
    <div>
      <HeaderPerfil name="Tiago dos Santos" />
      <InforPerfilPrivate posts={posts} />
    </div>
  );
}
