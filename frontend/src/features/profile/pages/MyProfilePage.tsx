import InforPerfilPrivate from "@/features/profile/components/InforPerfilPrivate";
import Header from "@/shared/components/layout/Header";
import { usePostsQuery } from "@/features/feed/query/usePostsQuery";
import { useMyProfileQuery } from "@/features/profile/query/useMyProfileQuery";

export default function MyProfilePage() {
  const { data: profile, isLoading, isError, error, refetch } = useMyProfileQuery();
  const { data: postsData } = usePostsQuery();
  const posts = postsData?.pages.flat() ?? [];

  const myPosts = profile ? posts.filter((post) => post.authorId === profile.id) : [];

  return (
    <div>
      <Header />
      {isError ? (
        <div className="pt-20 flex flex-col items-center gap-3 text-center px-4">
          <p className="text-sm text-red-500">
            {error instanceof Error ? error.message : "Não foi possível carregar o perfil."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold hover:bg-gray-50"
          >
            Tentar novamente
          </button>
        </div>
      ) : isLoading || !profile ? (
        <div className="pt-20 flex justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        </div>
      ) : (
        <div className="pt-20">
          <InforPerfilPrivate profile={profile} posts={myPosts} />
        </div>
      )}
    </div>
  );
}
