import { createFileRoute } from "@tanstack/react-router";
import CreatePost from "@/components/CreatePost";
import PostContent from "@/components/PostContent";
import { posts } from "@/api";
import ModalSearch from "@/components/ModalSearch";

export const Route = createFileRoute("/__private/")({
  component: App,
  // beforeLoad: ({ context }) => {
  //   throw redirect({
  //     to: "/preload",
  //     replace: true,
  //   });
  // },
});

import { useModalSearchSore } from "@/store/useModalSeachStore";
import Header from "@/components/Header";

function App() {
  const modal = useModalSearchSore((state) => state.modal);

  return (
    <main className="bg-background">
      <Header />
      {modal && <ModalSearch />}

      <CreatePost />

      <PostContent posts={posts} />
    </main>
  );
}
