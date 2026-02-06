import { useState } from "react";
import { X, Search, Check } from "lucide-react"; // ou use react-icons
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const hobbiesRelacionamento = [
  "Filmes",
  "Séries",
  "Cinema",
  "Teatro",
  "Shows",
  "Concertos",
  "Música ao vivo",
  "Podcasts",
  "Animes",
  "K-dramas",
  "Documentários",
  "Jogos online",
  "Games de console",
  "Games mobile",
  "E-sports",
  "Programação",
  "Tecnologia",
  "Startups",
  "Inteligência Artificial",
  "Criação de conteúdo",
  "Streaming",
  "Academia",
  "Musculação",
  "Corrida",
  "Caminhada",
  "Crossfit",
  "Yoga",
  "Pilates",
  "Natação",
  "Ciclismo",
  "Artes marciais",
  "Futebol",
  "Vôlei",
  "Basquete",
  "Viajar",
  "Mochilão",
  "Praia",
  "Montanha",
  "Camping",
  "Ecoturismo",
  "Viagens internacionais",
  "Viagens de carro",
  "Fotografia de viagem",
  "Cozinhar",
  "Gastronomia",
  "Culinária internacional",
  "Comida vegana",
  "Comida vegetariana",
  "Churrasco",
  "Doces",
  "Leitura",
  "Livros",
  "Ficção",
  "Não-ficção",
  "Fantasia",
  "Autoajuda",
  "Psicologia",
  "Filosofia",
  "História",
  "Aprender idiomas",
  "Desenho",
  "Pintura",
  "Ilustração",
  "Fotografia",
  "Design",
  "Moda",
  "Artesanato",
  "Escrita criativa",
  "Poesia",
  "Produção musical",
  "Meditação",
  "Autoconhecimento",
  "Espiritualidade",
  "Mindfulness",
  "Vida saudável",
  "Minimalismo",
  "Sustentabilidade",
  "Voluntariado",
  "Cachorros",
  "Gatos",
  "Animais de estimação",
  "Adoção de pets",
  "Passear com pets",
  "Sair com amigos",
  "Festas",
  "Eventos sociais",
  "Networking",
  "Conhecer pessoas",
];

type PropsType = {
  onClose: () => void;
};

export default function ModalPerfil({ onClose }: PropsType) {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);

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
    console.log("Hobbies selecionados:", selectedHobbies);
    // Aqui você pode fechar o modal ou enviar os dados
  };

  return (
    <section
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex 
    justify-center items-center p-4 animate-fadeIn"
    >
      <div
        className="bg-gradient-to-br from-white to-gray-50 w-full max-w-4xl 
      max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden 
      animate-slideUp"
      >
        {/* Header */}
        <div
          className="relative p-6 border-b border-gray-100 bg-gradient-to-r 
        from-primary/5 to-secondary/5"
        >
          <button
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 
            transition-colors"
            onClick={onClose} // Adicione uma prop onClose se necessário
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="text-center">
            <h2
              className="text-xl font-bold bg-gradient-to-r from-primary 
            to-secondary bg-clip-text text-transparent"
            >
              Escolha seus interesses
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Selecione até 10 hobbies que combinam com você
            </p>
          </div>

          {/* Contador e botão limpar */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <div
                className={`px-3 py-1 rounded-full ${
                  selectedCount > 0
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span className="font-semibold">{selectedCount}/10</span>
                <span className="ml-1">selecionados</span>
              </div>
              {selectedCount > 0 && (
                <button
                  onClick={clearSelection}
                  className="text-sm text-gray-500 hover:text-primary 
                  hover:underline transition-colors"
                >
                  Limpar tudo
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Barra de pesquisa */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar hobbies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 
                  rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 
                  focus:border-primary transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Hobbies selecionados (chips) */}
        {selectedCount > 0 && (
          <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
            <div
              className="flex md:flex-wrap overflow-auto md:overflow-hidden 
            p-2  gap-2"
            >
              <Swiper
                mousewheel
                slidesPerView={selectedCount > 1 ? 2 : 1}
                keyboard={{ enabled: true }}
                grabCursor
                scrollbar={{ draggable: true }}
                loop={false}
                spaceBetween={10}
                direction="horizontal"
              >
                {selectedHobbies.map((hobby) => (
                  <SwiperSlide
                    key={hobby}
                    className="group items-center  bg-gradient-to-r 
                    from-primary to-secondary text-white px-2  py-1.5 
                    rounded-full animate-fadeIn"
                  >
                    <span className="text-[8px] font-medium">#{hobby}</span>
                    <button
                      onClick={() => handleSelectHobby(hobby)}
                      className="opacity-0 group-hover:opacity-100 
                      transition-opacity p-0.5 hover:bg-white/20 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}

        {/* Grid de hobbies */}
        <div className="flex-1 overflow-y-auto p-6">
          <div
            className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 
                      lg:grid-cols-5 gap-3"
          >
            {filteredHobbies.map((hobby) => {
              const isSelected = selectedHobbies.includes(hobby);
              return (
                <button
                  key={hobby}
                  onClick={() => handleSelectHobby(hobby)}
                  disabled={!isSelected && selectedCount >= 10}
                  className={`relative group p-4 rounded-xl border-2 
                    transition-all duration-300 transform hover:scale-[1.02] 
                    active:scale-[0.98] 
                    ${
                      isSelected
                        ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/10"
                        : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                    }
                    ${!isSelected && selectedCount >= 10 ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center 
                        justify-center transition-colors
                      ${isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-600 group-hover:bg-primary/20"}`}
                    >
                      {isSelected ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-lg">+</span>
                      )}
                    </div>
                    <span
                      className={`font-medium text-[10px] transition-colors
                      ${isSelected ? "text-primary" : "text-gray-700 group-hover:text-primary"}`}
                    >
                      {hobby}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute -top-1 -right-1">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounceIn">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {filteredHobbies.length === 0 && (
            <div className="text-center py-12">
              <div
                className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex 
              items-center justify-center mb-4"
              >
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Nenhum hobby encontrado
              </h3>
              <p className="text-gray-500">
                Tente buscar com outras palavras-chave
              </p>
            </div>
          )}
        </div>

        {/* Footer com botões */}
        <div className="p-3 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between gap-4">
            <button
              onClick={onClose}
              className="p-2 border-2 border-gray-300 
              text-gray-700 font-semibold rounded-xl hover:bg-gray-100 
              hover:border-gray-400 transition-all duration-300 text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedCount === 0}
              className={`px-8 py-3 font-semibold rounded-xl transition-all 
                duration-300 transform hover:scale-[1.02] disabled:opacity-50 
                disabled:cursor-not-allowed text-[10px]
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

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Seus interesses ajudam a encontrar pessoas com gostos similares
            </p>
          </div>
        </div>
      </div>
    </section>
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
