import { useNavigate } from "@tanstack/react-router";
import { useModalSearchSore } from "@/features/feed/hooks/useSearchPostsStore";
import { getOptimizedImageUrl } from "@/shared/lib/imageUrl";

type ModalSearchProps = {
  onSelect?: () => void;
};

export default function ModalSearch({ onSelect }: ModalSearchProps) {
  const posts = useModalSearchSore((state) => state.posts);
  const navigate = useNavigate();

  const authors = posts.filter(
    (post, index, all) =>
      all.findIndex((p) => p.authorId === post.authorId) === index,
  );

  const handleSelect = (authorId: number) => {
    onSelect?.();
    navigate({ to: "/perfil/$perfil", params: { perfil: String(authorId) } });
  };

  return (
    <div className="fixed md:max-w-3xl md:m-auto right-5 overflow-y-auto left-5 bg-surface top-14 rounded-2xl shadow-xl border border-gray-100 bottom-20 z-10000 p-2">
      {authors.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-10">
          Nenhum resultado encontrado
        </p>
      )}
      {authors.map((perfil) => (
        <button
          key={perfil.authorId}
          type="button"
          onClick={() => handleSelect(perfil.authorId)}
          className="flex w-full items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left cursor-pointer"
        >
          <img
            className="size-12 rounded-full object-cover ring-2 ring-white shadow-sm"
            src={getOptimizedImageUrl(perfil.author.photos[0]?.url ?? "/image_perfil.png", 96)}
            alt="Foto de perfil"
            loading="lazy"
            decoding="async"
          />
          <span className="text-gray-800 font-medium">{perfil.author.name}</span>
        </button>
      ))}
    </div>
  );
}
