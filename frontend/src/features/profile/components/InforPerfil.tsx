import { useState } from "react";
import { type PostType } from "@/features/feed/api/posts";
import type { UserProfile } from "@/features/match/api/matches";
import PostContent from "@/features/feed/components/PostContent";
import { LocateIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { getOptimizedImageUrl } from "@/shared/lib/imageUrl";
import { useContactsQuery, contactsQueryKey } from "@/features/chat/query/useContactsQuery";
import { startConversation } from "@/features/chat/api/contacts";
import { ApiRequestError } from "@/shared/lib/httpClient";

type PropsType = {
  posts: PostType[];
  inforPerfil: UserProfile;
  id: string;
};

export default function InforPerfil({ posts, inforPerfil, id }: PropsType) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: contacts } = useContactsQuery();
  const existingMatchId = contacts.find((entry) => entry.contact.id === Number(id))?.matchId;
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (isStarting) return;
    setError(null);

    if (existingMatchId) {
      navigate({ to: "/contact/$chat", params: { chat: String(existingMatchId) } });
      return;
    }

    setIsStarting(true);
    try {
      const { matchId } = await startConversation(Number(id));
      await queryClient.invalidateQueries({ queryKey: contactsQueryKey });
      navigate({ to: "/contact/$chat", params: { chat: String(matchId) } });
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Não foi possível iniciar a conversa.");
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div>
      <div className="w-full h-56 md:h-80 relative overflow-hidden bg-gradient-to-br from-primary/40 to-accent/40">
        {inforPerfil.coverUrl && (
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={inforPerfil.coverUrl}
            alt="Capa do perfil"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
      </div>

      <div className="m-auto max-w-3xl">
      <div className="bg-surface -mt-10 relative z-10 rounded-3xl shadow-sm pt-4 pb-3 px-5">
        <div className="flex justify-between items-end">
          <div
            className="h-24 w-24 -mt-16 rounded-full
        overflow-hidden flex items-center justify-center border-4 border-surface shadow-md bg-gray-100"
          >
            <img
              className="max-w-full max-h-full    scale-[1.5] "
              src={getOptimizedImageUrl(inforPerfil.photos[0]?.url ?? "/image_perfil.png", 160)}
              alt="imagem de perfil"
              loading="lazy"
              decoding="async"
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={isStarting}
            className="text-white shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.97]
                   bg-gradient-to-r from-pink-500 to-purple-500 px-4 text-xs font-semibold py-2.5
                   rounded-full cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
          >
            {isStarting ? "Abrindo..." : "Mandar Mensagem"}
          </button>
        </div>

        {error && <p className="mt-2 text-sm text-red-500 text-right">{error}</p>}

        <div>
          <div className="mt-3">
            <span className="font-bold text-xl block font-display text-gray-900">
              {inforPerfil.name}
              <span className="font-semibold text-base font-sans text-gray-400">
                {" "}
                · {inforPerfil.age} anos
              </span>
            </span>
          </div>

          <p className="my-2 text-gray-600 leading-relaxed">
            {inforPerfil.bio}
          </p>

          {inforPerfil.city && (
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <LocateIcon size={16} className="text-accent" />
              {inforPerfil.city}
            </div>
          )}

          <div className="flex gap-2 flex-wrap my-3">
            {inforPerfil.interests.length > 0 &&
              inforPerfil.interests.map((inte) => (
                <span
                  key={inte}
                  className="text-xs font-semibold font-display px-3 py-1 rounded-full bg-accent/10 text-accent"
                >
                  #{inte}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div className="pt-4">
        <PostContent posts={posts} />
      </div>
      </div>
    </div>
  );
}
