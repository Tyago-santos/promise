import { X } from "lucide-react";

type PropsType = {
  selectedHobbies: string[];
  onRemove: (hobby: string) => void;
};

export default function HobbyChipList({ selectedHobbies, onRemove }: PropsType) {
  if (selectedHobbies.length === 0) return null;

  return (
    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
      <div className="flex flex-wrap gap-2">
        {selectedHobbies.map((hobby) => (
          <span
            key={hobby}
            className="group flex items-center gap-1.5 bg-gradient-to-r
              from-primary to-secondary text-white pl-3 pr-1.5 py-1.5
              rounded-full animate-fadeIn"
          >
            <span className="text-xs font-medium">{hobby}</span>
            <button
              onClick={() => onRemove(hobby)}
              className="p-0.5 hover:bg-white/25 rounded-full transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
