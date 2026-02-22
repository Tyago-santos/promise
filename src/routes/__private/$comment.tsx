import { posts } from "@/api";
import HeaderPerfil from "@/components/HeaderPerfil";
import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";

export const Route = createFileRoute("/__private/$comment")({
  component: RouteComponent,
  beforeLoad: () => ({
    head: {
      meta: [
        {
          title: "Comentarios | Promise",
          description: "Faça cadastro na plataforma Promise",
          keywords: "cadastro, autenticação, promise",
        },
      ],
    },
  }),
});

function RouteComponent() {
  const { comment } = Route.useParams();
  const id: number = +comment;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-8 md:px-6 lg:px-8 overflow-scroll ">
      <div className="w-full relative  h-[100dvh] ">
        <HeaderPerfil name="Comentarios" />

        {posts[id].comentarios.length < 1 && (
          <div className="pt-8 text-center font-display text-xl font-bold md:pt-10">
            Nao ha comentarios neste post
          </div>
        )}

        {posts[id].comentarios.map((comment, i) => (
          <article
            className="flex gap-2 border-b px-2 border-gray-200 py-4  md:gap-4 md:py-5  "
            key={i}
          >
            <img
              className="h-12 w-12 rounded-full object-cover md:h-14 md:w-14"
              src={posts[id].imagens}
              alt="imagem de Perfil"
            />
            <div className="min-w-0 flex-1">
              <span className="font-display text-lg font-bold md:text-xl">
                {comment.usuario}
              </span>
              <p className="mt-1 break-words text-sm md:text-base">
                {comment.texto}
              </p>
              <div className="mt-2 text-xs text-text/80 md:text-sm">{`${new Date(comment.data).getDate()} /
               ${new Date(comment.data).getMonth() + 1} / 
               ${new Date(comment.data).getFullYear()} `}</div>
            </div>
          </article>
        ))}

        <div className="flex gap-2 mt-6 absolute right-0 left-0 bottom-10">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            className={`flex-1 px-4 py-2 shadow-lg inset-shadow-sm rounded-lg 
                focus:outline-none transform duration-300  translateY(-400px) 
                focus:ring-2 focus:ring-blue-500 transition-transform`}
          />
          <button className=" p-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:bg-blue-600 transition">
            <Send size={15} />
          </button>
        </div>
      </div>
    </main>
  );
}
