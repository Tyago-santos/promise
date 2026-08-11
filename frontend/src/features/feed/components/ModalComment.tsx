import type { PostType } from "@/features/feed/api/posts";
import { Send, UserRound, X } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { getOptimizedImageUrl } from "@/shared/lib/imageUrl";
import { formatCommentAge } from "@/features/feed/services/postService";
import { useAddCommentMutation, useToggleLikeMutation } from "@/features/feed/query/usePostsQuery";

type PropsType = {
  post: PostType;
  onClose?: () => void;
};

export default function ModalComment({ post, onClose }: PropsType) {
  const [commentText, setCommentText] = useState("");
  const toggleLikeMutation = useToggleLikeMutation();
  const addCommentMutation = useAddCommentMutation();

  const formatDate = formatCommentAge;

  const handleSendComment = async () => {
    const text = commentText.trim();
    if (!text || addCommentMutation.isPending) return;
    await addCommentMutation.mutateAsync({ postId: post.id, text });
    setCommentText("");
  };

  return (
    <div
      className="fixed inset-0 z-10001 flex items-center justify-center bg-black/80 md:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-[100dvh] w-full flex-col overflow-y-auto bg-surface shadow-2xl md:h-[min(90vh,44rem)] md:max-w-xl md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-gray-100 bg-surface px-4 py-3">
          <span className="font-display font-bold text-gray-800">
            Post de {post.author.name}
          </span>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Imagem */}
        {post.imageUrl && (
          <div className="flex aspect-[4/3] shrink-0 items-center justify-center bg-black md:h-[380px] md:aspect-auto">
            <img
              className="h-full w-full object-contain"
              src={getOptimizedImageUrl(post.imageUrl, 800)}
              alt="Imagem da publicação"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        {/* Contadores */}
        <div className="flex shrink-0 items-center justify-between px-4 py-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="flex size-5 items-center justify-center rounded-full bg-pink-500 text-white">
              <FaHeart className="size-2.5" />
            </span>
            {post.likesCount}
          </span>
          <span>{post.comments.length} comentários</span>
        </div>

        {/* Ações */}
        <div className="flex shrink-0 gap-1 border-y border-gray-100 px-2 py-1">
          <button
            onClick={() => toggleLikeMutation.mutate(post.id)}
            disabled={toggleLikeMutation.isPending}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium font-display transition-colors disabled:opacity-60 ${
              post.likedByMe
                ? "text-pink-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-pink-600"
            }`}
          >
            {post.likedByMe ? (
              <FaHeart className="size-4" />
            ) : (
              <FaRegHeart className="size-4" />
            )}
            Curtir
          </button>
        </div>

        {/* Comentários */}
        <div className="px-4 py-3">
          <div className="flex gap-2.5">
            <img
              className="size-9 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
              src={getOptimizedImageUrl(post.author.photos[0]?.url ?? "/image_perfil.png", 72)}
              alt="Foto de perfil"
              loading="lazy"
              decoding="async"
            />
            <div className="min-w-0">
              <span className="font-display text-sm font-bold text-gray-800">
                {post.author.name}
              </span>
              <p className="mt-0.5 break-words text-sm text-gray-700">
                {post.description}
              </p>
            </div>
          </div>

          {post.comments.length === 0 ? (
            <p className="mt-6 text-center text-sm text-gray-400">
              Ainda não há comentários
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {post.comments.map((comment) => (
                <div className="flex items-start gap-2.5" key={comment.id}>
                  <img
                    className="size-9 shrink-0 rounded-full object-cover"
                    src={getOptimizedImageUrl(comment.author.photos[0]?.url ?? "/image_perfil.png", 72)}
                    alt="Foto de perfil"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="min-w-0">
                    <div className="inline-block rounded-2xl bg-gray-100 px-3 py-2">
                      <span className="block font-display text-sm font-bold text-gray-800">
                        {comment.author.name}
                      </span>
                      <p className="break-words text-sm text-gray-700">
                        {comment.text}
                      </p>
                    </div>
                    <div className="mt-1 flex gap-3 px-3 text-xs text-gray-400">
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comentar */}
        <div className="sticky bottom-0 z-10 flex shrink-0 items-center gap-2 border-t border-gray-100 bg-surface p-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <UserRound size={16} />
          </div>
          <div className="flex flex-1 items-center gap-1 rounded-full bg-gray-100 pl-4 pr-1.5 py-1.5 focus-within:ring-2 focus-within:ring-secondary/30">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
              placeholder="Comente..."
              className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
            />
          </div>
          <button
            onClick={handleSendComment}
            disabled={!commentText.trim() || addCommentMutation.isPending}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-md hover:shadow-lg active:scale-95 disabled:opacity-40 transition-all"
            aria-label="Enviar comentário"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
