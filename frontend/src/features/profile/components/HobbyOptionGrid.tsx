import { Check, Search } from "lucide-react";

type PropsType = {
  hobbies: string[];
  selectedHobbies: string[];
  selectedCount: number;
  onSelect: (hobby: string) => void;
};

export default function HobbyOptionGrid({
  hobbies,
  selectedHobbies,
  selectedCount,
  onSelect,
}: PropsType) {
  if (hobbies.length === 0) {
    return (
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
        <p className="text-gray-500">Tente buscar com outras palavras-chave</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {hobbies.map((hobby) => {
        const isSelected = selectedHobbies.includes(hobby);
        return (
          <button
            key={hobby}
            onClick={() => onSelect(hobby)}
            disabled={!isSelected && selectedCount >= 10}
            className={`group p-3 rounded-xl border-2
              transition-all duration-200 transform hover:scale-[1.02]
              active:scale-[0.98]
              ${
                isSelected
                  ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-md shadow-primary/10"
                  : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
              }
              ${!isSelected && selectedCount >= 10 ? "opacity-50 cursor-not-allowed" : ""}
          `}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 shrink-0 rounded-full flex items-center
                  justify-center transition-colors
                ${isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-500 group-hover:bg-primary/20"}`}
              >
                {isSelected ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <span className="text-base leading-none">+</span>
                )}
              </div>
              <span
                className={`font-medium text-sm text-left leading-snug transition-colors
                ${isSelected ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"}`}
              >
                {hobby}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
