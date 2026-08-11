import { usePostsQuery } from "@/features/feed/query/usePostsQuery";
import Header from "@/shared/components/layout/Header";
import CreatePost from "@/features/feed/components/CreatePost";
import PostContent from "@/features/feed/components/PostContent";
import FeedSkeleton from "@/features/feed/components/FeedSkeleton";
import WelcomeSignupModal from "@/features/feed/components/WelcomeSignupModal";
import { REWARD_STORAGE_KEY } from "@/features/feed/services/rewardStorage";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";

const WelcomeReward = lazy(
  () => import("@/features/feed/components/WelcomeReward"),
);

export default function FeedPage() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostsQuery();
  const posts = useMemo(() => data?.pages.flat() ?? [], [data]);

  const [showReward] = useState(
    () => !localStorage.getItem(REWARD_STORAGE_KEY),
  );

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <main className="bg-background ">
      <WelcomeSignupModal />
      <Header />

      <CreatePost />
      {showReward && (
        <Suspense fallback={null}>
          <WelcomeReward />
        </Suspense>
      )}

      {isLoading ? (
        <FeedSkeleton />
      ) : (
        <>
          <PostContent posts={posts} />
          {hasNextPage && (
            <div ref={loadMoreRef} className="flex justify-center py-6">
              {isFetchingNextPage && (
                <div className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
}
