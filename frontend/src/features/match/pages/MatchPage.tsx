import { useState } from "react";
import { Heart, X, Sparkles, RefreshCw } from "lucide-react";
import HeaderPerfil from "@/shared/components/layout/HeaderPerfil";
import ModalMatch from "@/features/match/components/ModalMatch";
import { getOptimizedImageUrl } from "@/shared/lib/imageUrl";

import { useProfilesQuery } from "@/features/match/query/useProfilesQuery";
import { useSwipeMutation } from "@/features/match/query/useSwipeMutation";
import type { UserProfile } from "@/features/match/api/matches";

export default function MatchPage() {
  const [hasSearched, setHasSearched] = useState(false);
  const { data: profiles, isLoading, refetch, isRefetching } = useProfilesQuery(hasSearched);
  const swipeMutation = useSwipeMutation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [matched, setMatched] = useState<{ profile: UserProfile; matchId: number } | null>(null);

  const current = profiles[currentIndex];
  const hasMoreProfiles = currentIndex < profiles.length;

  const handleStartSearch = () => {
    setHasSearched(true);
  };

  const handleSwipe = (liked: boolean) => {
    if (!current || swipeMutation.isPending) return;

    swipeMutation.mutate(
      { targetId: current.id, liked },
      {
        onSuccess: (result) => {
          if (result.matched) {
            setMatched({ profile: current, matchId: result.match.id });
          }
          setCurrentIndex((prev) => prev + 1);
        },
      },
    );
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    refetch();
  };

  if (!hasSearched) {
    return (
      <div className="h-[100dvh] bg-gradient-to-br from-primary via-accent/70 to-secondary overflow-scroll p-4 flex flex-col">
        <HeaderPerfil match={true} />

        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="w-48 h-48 mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20 blur-xl" />
            <div className="absolute inset-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="w-20 h-20 text-white animate-tinder" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">Encontre seu Match</h2>
          <p className="text-white/80 mb-8 max-w-md">
            Clique no botão abaixo para começar a procurar pessoas compatíveis com você. Avalie perfis e encontre
            conexões especiais.
          </p>

          <button
            onClick={handleStartSearch}
            className="bg-white text-primary font-bold py-4 px-12 rounded-full text-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5" />
            Procurar Match
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-[100dvh] bg-gradient-to-br from-primary via-accent/70 to-secondary flex flex-col items-center justify-center p-4">
        <div className="relative mb-8">
          <div className="w-32 h-32 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <Heart className="w-16 h-16 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse animate-tinder" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Procurando matches...</h3>
        <p className="text-white/70 text-center max-w-md">
          Estamos procurando pessoas que combinam com suas preferências
        </p>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-gradient-to-br from-primary via-accent/70 to-secondary overflow-scroll p-4 flex flex-col relative">
      <HeaderPerfil match={true} />

      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        {hasMoreProfiles && current ? (
          <div className="w-full max-w-sm">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 aspect-[3/4]">
              <img
                className="w-full h-full object-cover"
                src={getOptimizedImageUrl(current.photos[0]?.url ?? "/image_perfil.png", 480)}
                alt={current.name}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-left">
                <h2 className="text-2xl font-bold text-white drop-shadow-sm">
                  {current.name}
                  {current.age ? <span className="font-semibold text-white/80">, {current.age}</span> : null}
                </h2>
                {current.city && <p className="text-white/80 text-sm mt-0.5">{current.city}</p>}
                {current.bio && <p className="text-white/85 text-sm mt-2 line-clamp-2">{current.bio}</p>}
                {current.interests.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap mt-3">
                    {current.interests.slice(0, 4).map((interest) => (
                      <span
                        key={interest}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-6">
              <button
                onClick={() => handleSwipe(false)}
                disabled={swipeMutation.isPending}
                aria-label="Passar"
                className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center shadow-lg hover:bg-white/25 active:scale-95 transition-all disabled:opacity-50"
              >
                <X className="w-7 h-7" />
              </button>
              <button
                onClick={() => handleSwipe(true)}
                disabled={swipeMutation.isPending}
                aria-label="Curtir"
                className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                <Heart className="w-7 h-7 fill-current" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-24 h-24 mb-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-sm">
              Sem novos perfis por agora
            </h2>
            <p className="text-white/80 mb-6 max-w-sm">
              Você já avaliou todo mundo disponível. Volte mais tarde ou tente novamente.
            </p>
            <button
              onClick={handleRestart}
              disabled={isRefetching}
              className="bg-white text-primary font-bold py-3 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`} />
              Buscar novamente
            </button>
          </>
        )}
      </div>

      {matched && <ModalMatch matched={matched} onClose={() => setMatched(null)} />}
    </div>
  );
}
