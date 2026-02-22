import { createFileRoute, redirect } from "@tanstack/react-router";
import CreatePost from "@/components/CreatePost";
import PostContent from "@/components/PostContent";

import ModalSearch from "@/components/ModalSearch";
import WelcomeSignupModal from "@/components/WelcomeSignupModal";

export const Route = createFileRoute("/__private/")({
  component: App,
  beforeLoad: () => {
    const auth = localStorage.getItem("auth");
    if (!auth)
      throw redirect({
        to: "/preload",
        replace: true,
      });

    return {
      head: {
        meta: [
          {
            title: "Home | Promise",
            description: "Faça cadastro na plataforma Promise",
            keywords: "cadastro, autenticação, promise",
          },
        ],
      },
    };
  },
});

import { useModalSearchSore } from "@/store/useModalSeachStore";
import Header from "@/components/Header";
import { postStore } from "@/store/postStore";
import { useReward } from "react-rewards";
import { useEffect } from "react";

function App() {
  const modal = useModalSearchSore((state) => state.modal);
  const posts = postStore((state) => state.posts);

  const REWARD_STORAGE_KEY = "reward_seen_once";

  const { reward } = useReward("emojiReward", "emoji", {
    emoji: ["❤️", "😁", "👏", "✨"], // Mix de corações
    startVelocity: 45, // Explosão inicial forte
    elementCount: 80, // Quantidade generosa
    spread: 100, // Abertura do leque
    decay: 0.95, // Mantém a velocidade por um tempo
    elementSize: 25,
    lifetime: 1000,
  });

  useEffect(() => {
    const hasSeenReward = localStorage.getItem(REWARD_STORAGE_KEY);

    if (hasSeenReward) return;

    reward();
    localStorage.setItem(REWARD_STORAGE_KEY, "true");
  }, [reward]);

  return (
    <main className="bg-backgroun ">
      <WelcomeSignupModal />
      <Header />
      {modal && <ModalSearch />}

      <CreatePost />
      <span
        style={{ position: "fixed", top: 0, left: "50%" }}
        id="emojiReward"
      />

      <PostContent posts={posts.reverse()} />
    </main>
  );
}
