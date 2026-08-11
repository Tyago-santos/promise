import { Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { getOptimizedImageUrl } from "@/shared/lib/imageUrl";
import type { UserProfile } from "@/features/match/api/matches";

type PropsType = {
  matched: { profile: UserProfile; matchId: number };
  onClose: () => void;
};

export default function ModalMatch({ matched, onClose }: PropsType) {
  const navigate = useNavigate();
  const { profile } = matched;

  return (
    <div className="fixed h-screen inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-3xl p-8 max-w-md w-full text-center text-white shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <div className="text-white text-center">
            <div className="rounded-full p-1 shadow-md bg-gradient-to-r from-[#F6C89F] to-[#8B82B5] inline-block">
              <img
                className="h-24 w-24 rounded-full object-cover border-2 border-white"
                src={getOptimizedImageUrl(profile.photos[0]?.url ?? "/image_perfil.png", 192)}
                alt={profile.name}
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="block mt-2 text-sm font-semibold truncate max-w-32">{profile.name}</span>
          </div>
        </div>

        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-md mx-auto -mt-2 mb-4">
          <Heart className="w-6 h-6 text-pink-500 animate-tinder fill-pink-500" />
        </div>

        <h2 className="text-2xl font-bold mb-6">
          Você e {profile.name} deram match!
        </h2>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="bg-white/30 backdrop-blur-md text-white font-semibold py-3 px-6 rounded-full hover:bg-white/40 transition"
          >
            Continuar
          </button>
          <button
            onClick={() =>
              navigate({
                to: "/contact/$chat",
                params: { chat: String(matched.matchId) },
              })
            }
            className="bg-white text-pink-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Conversar
          </button>
        </div>
      </div>
    </div>
  );
}
