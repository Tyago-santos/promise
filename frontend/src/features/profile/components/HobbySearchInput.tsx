import { Search, X } from "lucide-react";

type PropsType = {
  value: string;
  onChange: (value: string) => void;
};

export default function HobbySearchInput({ value, onChange }: PropsType) {
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Pesquisar hobbies..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200
              rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30
              focus:border-primary transition-all text-sm"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2
            text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
