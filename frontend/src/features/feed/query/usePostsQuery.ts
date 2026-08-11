import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addComment,
  createPost,
  listPosts,
  toggleLike,
} from "@/features/feed/api/posts";

export const postsQueryKey = ["posts"] as const;
const PAGE_SIZE = 20;

export function usePostsQuery() {
  return useInfiniteQuery({
    queryKey: postsQueryKey,
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => listPosts(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.length === PAGE_SIZE ? lastPage[lastPage.length - 1].id : undefined,
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
    },
  });
}

export function useToggleLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => toggleLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
    },
  });
}

export function useAddCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, text }: { postId: number; text: string }) => addComment(postId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
    },
  });
}
