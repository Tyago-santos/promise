import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/features/auth";
import { ChatConversationPage } from "@/features/chat";

export const Route = createFileRoute("/__private/contact/$chat")({
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
            title: "Chat | Promise",
            description: "Faça cadastro na plataforma Promise",
            keywords: "cadastro, autenticação, promise",
          },
        ],
      },
    };
  },
});

function RouteComponent() {
  const { chat } = Route.useParams();
  return <ChatConversationPage chat={chat} />;
}
