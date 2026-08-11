import { useEffect } from "react";
import { useReward } from "react-rewards";
import { REWARD_STORAGE_KEY } from "@/features/feed/services/rewardStorage";

export default function WelcomeReward() {
  const { reward } = useReward("emojiReward", "emoji", {
    emoji: ["❤️", "😁", "👏", "✨"], // Mix de corações
    startVelocity: 45, // Explosão inicial forte
    elementCount: 40, // Reduzido para aliviar o primeiro paint
    spread: 100, // Abertura do leque
    decay: 0.95, // Mantém a velocidade por um tempo
    elementSize: 25,
    lifetime: 1000,
  });

  useEffect(() => {
    reward();
    localStorage.setItem(REWARD_STORAGE_KEY, "true");
  }, [reward]);

  return (
    <span
      style={{ position: "fixed", top: 0, left: "50%" }}
      id="emojiReward"
    />
  );
}
