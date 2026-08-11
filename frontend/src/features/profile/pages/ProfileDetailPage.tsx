import { useProfileQuery } from "@/features/profile/query/useProfileQuery";
import { usePostsQuery } from "@/features/feed/query/usePostsQuery";
import Header from "@/shared/components/layout/Header";
import InforPerfil from "@/features/profile/components/InforPerfil";

type PropsType = {
  perfilId: string;
};

export default function ProfileDetailPage({ perfilId }: PropsType) {
  const id = +perfilId;
  const { data: profile, isLoading, isError, error, refetch } = useProfileQuery(id);
  const { data: postsData } = usePostsQuery();
  const authorPosts = (postsData?.pages.flat() ?? []).filter((post) => post.authorId === id);

  if (isError) {
    return (
      <main>
        <Header />
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
      </main>
    );
  }

  if (isLoading || !profile) {
    return (
      <main>
        <Header />
        <div className="pt-20 flex justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <div className="pt-20">
        <InforPerfil id={String(id)} inforPerfil={profile} posts={authorPosts} />
      </div>
    </main>
  );
}
