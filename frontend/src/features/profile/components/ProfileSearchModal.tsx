import { useNavigate } from "@tanstack/react-router";
import type { Profile } from "@/features/profile/api/profile";
import { getOptimizedImageUrl } from "@/shared/lib/imageUrl";

type ProfileSearchModalProps = {
  profiles: Profile[];
  isLoading?: boolean;
  onSelect?: () => void;
};

export default function ProfileSearchModal({ profiles, isLoading, onSelect }: ProfileSearchModalProps) {
  const navigate = useNavigate();

  const handleSelect = (profileId: number) => {
    onSelect?.();
    navigate({ to: "/perfil/$perfil", params: { perfil: String(profileId) } });
  };

  return (
    <div className="fixed md:max-w-3xl md:m-auto right-5 overflow-y-auto left-5 bg-surface top-14 rounded-2xl shadow-xl border border-gray-100 bottom-20 z-10000 p-2">
      {isLoading && (
        <p className="text-center text-gray-400 text-sm py-10">Buscando...</p>
      )}
      {!isLoading && profiles.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-10">
          Nenhum resultado encontrado
        </p>
      )}
      {!isLoading &&
        profiles.map((profile) => (
          <button
            key={profile.id}
            type="button"
            onClick={() => handleSelect(profile.id)}
            className="flex w-full items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left cursor-pointer"
          >
            <img
              className="size-12 rounded-full object-cover ring-2 ring-white shadow-sm"
              src={getOptimizedImageUrl(profile.photos[0]?.url ?? "/image_perfil.png", 96)}
              alt="Foto de perfil"
              loading="lazy"
              decoding="async"
            />
            <span className="text-gray-800 font-medium">{profile.name}</span>
          </button>
        ))}
    </div>
  );
}
