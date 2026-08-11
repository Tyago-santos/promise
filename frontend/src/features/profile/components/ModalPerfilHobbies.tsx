import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { userStore } from "@/features/profile/hooks/useUserStore";
import { hobbiesRelacionamento } from "@/features/profile/utils/hobbiesList";
import HobbySearchInput from "@/features/profile/components/HobbySearchInput";
import HobbyChipList from "@/features/profile/components/HobbyChipList";
import HobbyOptionGrid from "@/features/profile/components/HobbyOptionGrid";

type PropsType = {
  onClose: () => void;
};

export default function ModalPerfil({ onClose }: PropsType) {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);

  const addInters = userStore((state) => state.addInteresgePerfil);

  const filteredHobbies: string[] = hobbiesRelacionamento.filter((hobby) =>
    hobby.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
      setSelectedCount((prev) => prev - 1);
    } else if (selectedCount < 10) {
      // Limite de 10 hobbies
      setSelectedHobbies([...selectedHobbies, hobby]);
      setSelectedCount((prev) => prev + 1);
    }
  };

  const clearSelection = () => {
    setSelectedHobbies([]);
    setSelectedCount(0);
  };

  const handleConfirm = () => {
    addInters(selectedHobbies);
    onClose();
  };

  return createPortal(
    <section
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex
    justify-center items-center p-4 animate-fadeIn"
    >
      <div
        className="bg-white w-full max-w-4xl
      max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden
      animate-slideUp"
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-primary/15 to-secondary/15">
          <button
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/60
            transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="text-center pr-8">
            <h2 className="text-xl font-bold text-gray-900">
              Escolha seus interesses
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Selecione até 10 hobbies que combinam com você
            </p>
          </div>

          {/* Contador e botão limpar */}
          <div className="flex justify-center items-center gap-3 mt-4">
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCount > 0
                  ? "bg-primary/25 text-gray-800 font-semibold"
                  : "bg-white/70 text-gray-500"
              }`}
            >
              <span className="font-semibold">{selectedCount}/10</span>
              <span className="ml-1">selecionados</span>
            </div>
            {selectedCount > 0 && (
              <button
                onClick={clearSelection}
                className="text-sm text-gray-600 hover:text-gray-900
                  hover:underline transition-colors"
              >
                Limpar tudo
              </button>
            )}
          </div>
        </div>

        <HobbySearchInput value={searchTerm} onChange={setSearchTerm} />

        <HobbyChipList
          selectedHobbies={selectedHobbies}
          onRemove={handleSelectHobby}
        />

        {/* Grid de hobbies */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <HobbyOptionGrid
            hobbies={filteredHobbies}
            selectedHobbies={selectedHobbies}
            selectedCount={selectedCount}
            onSelect={handleSelectHobby}
          />
        </div>

        {/* Footer com botões */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border-2 border-gray-300
              text-gray-700 font-semibold rounded-xl hover:bg-gray-100
              hover:border-gray-400 transition-all duration-300 text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedCount === 0}
              className={`flex-1 px-6 py-2.5 font-semibold rounded-xl transition-all
                duration-300 transform hover:scale-[1.01] disabled:opacity-50
                disabled:cursor-not-allowed text-sm
                ${
                  selectedCount > 0
                    ? `bg-gradient-to-r from-primary to-secondary text-white
                       shadow-lg shadow-primary/25 hover:shadow-xl
                       hover:shadow-primary/35 `
                    : "bg-gray-200 text-gray-500"
                }`}
            >
              Confirmar ({selectedCount} selecionados)
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-gray-500">
            Seus interesses ajudam a encontrar pessoas com gostos similares
          </p>
        </div>
      </div>
    </section>,
    document.body,
  );
}

// Adicione estas animações no seu CSS global (tailwind.config.js ou styles globais)
export const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.4s ease-out;
}

.animate-bounceIn {
  animation: bounceIn 0.3s ease-out;
}
`;
