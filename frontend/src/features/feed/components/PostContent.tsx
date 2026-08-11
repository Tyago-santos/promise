import { Link } from "@tanstack/react-router";

import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";

import { type PostType } from "@/features/feed/api/posts";
import { memo, useState } from "react";
import { getOptimizedImageUrl } from "@/shared/lib/imageUrl";
import ModalComment from "@/features/feed/components/ModalComment";
import { daysSince } from "@/features/feed/services/postService";
import { useToggleLikeMutation } from "@/features/feed/query/usePostsQuery";

type PropsType = {
  posts: PostType[];
};

const PostContent = ({ posts }: PropsType) => {
  const [openCommentPostId, setOpenCommentPostId] = useState<number | null>(
    null,
  );
  const toggleLikeMutation = useToggleLikeMutation();

  const fomartDate = daysSince;
  return (
    <div className="m-auto max-w-3xl px-4 space-y-4 pb-8">
      {posts.map((post) => (
        <article
          key={post.id}
          className="flex bg-surface rounded-2xl shadow-sm border border-gray-100 p-4 gap-3 transition-shadow hover:shadow-md"
        >
          <Link
            to="/perfil/$perfil"
            params={{ perfil: String(post.authorId) }}
            className="shrink-0 overflow-hidden flex rounded-full
            items-center justify-center size-12 ring-2 ring-white shadow-sm outline outline-1 outline-gray-100"
          >
            <img
              className="transform scale-[2] max-h-full max-w-full  block"
              src={getOptimizedImageUrl(post.author.photos[0]?.url ?? "/image_perfil.png", 100)}
              alt="Imagem de perfil"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <div>
              <div className="flex items-center  gap-2">
                <span className="font-bold text-sm font-display">
                  {post.author.name}
                </span>
                <div className="size-1 bg-gray-300 rounded-full"></div>
                <span className="text-xs font-sans text-gray-400">
                  há {fomartDate(post.createdAt)}{" "}
                  {fomartDate(post.createdAt) === 1 ? "dia" : "dias"}
                </span>
              </div>
              <p className="block my-3 text-[15px] leading-relaxed text-gray-700">
                {post.description}
              </p>
            </div>
            {post.imageUrl && (
              <div className="rounded-xl bg-gray-100 overflow-hidden w-full aspect-[4/3] md:aspect-video">
                <img
                  src={getOptimizedImageUrl(post.imageUrl, 800)}
                  alt="Imagem da publicação"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="pt-3 mt-1 flex items-center gap-1 border-t border-gray-50">
              <button
                onClick={() => setOpenCommentPostId(post.id)}
                className="flex items-center gap-2 font-medium text-sm
                font-display text-gray-500 hover:text-secondary hover:bg-blue-50 transition-colors rounded-full px-3 py-1.5 -ml-3"
              >
                <FaRegComment className="size-4" />
                {post.comments.length}
              </button>
              <button
                onClick={() => toggleLikeMutation.mutate(post.id)}
                disabled={toggleLikeMutation.isPending}
                className="flex items-center gap-2 font-medium text-sm font-display text-gray-500 hover:text-pink-600 hover:bg-pink-50 transition-colors rounded-full px-3 py-1.5 disabled:opacity-60"
              >
                {post.likedByMe ? (
                  <FaHeart className="text-pink-600 size-4 animate-[tinder_0.35s_ease-in-out]" />
                ) : (
                  <FaRegHeart className="size-4" />
                )}
                {post.likesCount}
              </button>
            </div>
          </div>
        </article>
      ))}

      {openCommentPostId !== null && (
        <ModalComment
          post={posts.find((post) => post.id === openCommentPostId)!}
          onClose={() => setOpenCommentPostId(null)}
        />
      )}
    </div>
  );
};

export default memo(PostContent);
