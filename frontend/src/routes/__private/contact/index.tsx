import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/features/auth";
import { ChatListPage } from "@/features/chat";

export const Route = createFileRoute("/__private/contact/")({
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
            title: "Contatos | Promise",
            description: "Faça cadastro na plataforma Promise",
            keywords: "cadastro, autenticação, promise",
          },
        ],
      },
    };
  },
});

function RouteComponent() {
  const { media } = Route.useRouteContext();
  return <ChatListPage mediaMatches={media.matches} />;
}
