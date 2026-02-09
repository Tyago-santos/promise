import { createFileRoute } from "@tanstack/react-router";

import HeaderPefil from "@/components/HeaderPerfil";
import InforPerfil from "@/components/InforPerfil";

export const Route = createFileRoute("/__private/$perfil")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <HeaderPefil />
      <InforPerfil />
    </div>
  );
}
