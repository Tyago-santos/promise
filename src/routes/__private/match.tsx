import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import HeaderPerfil from "@/components/HeaderPerfil";
import ModalMatch from "@/components/ModalMatch";

import { allProfiles } from "@/api";

export const Route = createFileRoute("/__private/match")({
  component: RouteComponent,

  beforeLoad: () => ({
    head: {
      meta: [
        {
          title: "Match | Promise",
          description: "Faça cadastro na plataforma Promise",
          keywords: "cadastro, autenticação, promise",
        },
      ],
    },
  }),
});

function RouteComponent() {
  // Estados principais
  const [isSearching, setIsSearching] = useState(false);

  const [searchStatus, setSearchStatus] = useState<
    "idle" | "searching" | "found"
  >("idle"); // Status da busca

  // Iniciar busca de matches
  const handleStartSearch = () => {
    setIsSearching(true);
    setSearchStatus("searching");

    // Simula tempo de busca
    setTimeout(() => {
      setSearchStatus("found");
    }, 1500);
  };

  // TELA INICIAL - Antes de procurar
  if (!isSearching) {
    return (
      <div
        className="h-[100dvh] bg-gradient-to-b from-primary to-secondary 
      overflow-scroll p-4 flex flex-col"
      >
        <HeaderPerfil match={true} name="Tiago Santos" />

        {/* Conteúdo principal - Tela inicial */}
        <div
          className="flex-1 flex flex-col items-center justify-center 
        text-center p-4"
        >
          <div className="w-48 h-48 mb-8 relative">
            <div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 
            to-purple-500 rounded-full opacity-20 blur-xl"
            ></div>
            <div className="absolute inset-8 bg-gradient-to-r from-pink-500  to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="w-20 h-20 text-white animate-tinder" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            Encontre seu Match
          </h2>
          <p className="text-white/80 mb-8 max-w-md">
            Clique no botão abaixo para começar a procurar pessoas compatíveis
            com você. Avalie perfis e encontre conexões especiais.
          </p>

          {/* Botão principal para procurar */}
          <button
            onClick={handleStartSearch}
            className="bg-white text-primary font-bold py-4 px-12 rounded-full 
            text-lg hover:bg-gray-100 transition-all hover:scale-105 
            active:scale-95 flex items-center gap-3 mb-6 text-xl;                                                                                                                                                                                                                                                                                                                                                                                                                                                                       "
          >
            <Sparkles className="w-3 h-3" />
            Procurar Match
            <Sparkles className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }
  return (
    <ModalMatch
      searchStatus={searchStatus}
      allProfiles={allProfiles}
      setIsSearching={setIsSearching}
    />
  );
}
