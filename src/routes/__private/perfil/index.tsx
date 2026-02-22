import { createFileRoute } from "@tanstack/react-router";
import InforPerfilPrivate from "@/components/InforPerfilPrivate";
import HeaderPerfil from "@/components/HeaderPerfil";
import { posts } from "@/api";
import { userStore } from "@/store/userStore";

export const Route = createFileRoute("/__private/perfil/")({
  component: RouteComponent,
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

function RouteComponent() {
  const name = userStore((state) => state.name);
  let userInfor = {
    name,
    city: userStore((state) => state.city),
    state: userStore((state) => state.state),
    inters: userStore((state) => state.inters),
    age: userStore((state) => state.age),
    bio: userStore((state) => state.bio),
    img: userStore((state) => state.image_perfil),
    cover: userStore((state) => state.cover),
  };

  localStorage.setItem("user", JSON.stringify(userInfor));

  let user;

  if (!user) {
    user = localStorage.getItem("user");
  }
  return (
    <div>
      <HeaderPerfil name={name || "tigo"} />
      {user && <InforPerfilPrivate user={user} posts={posts} />}
    </div>
  );
}
