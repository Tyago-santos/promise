import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__private/perfil/$perfil")({
  component: PerfilApp,
});

export default function PerfilApp() {
  return <div>Perfil App</div>;
}
