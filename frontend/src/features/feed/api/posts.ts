import { apiFetch } from "@/shared/lib/httpClient";

export type PostAuthor = {
  id: number;
  name: string;
  email: string;
  photos: { url: string }[];
};

export type PostComment = {
  id: number;
  text: string;
  createdAt: string;
  postId: number;
  authorId: number;
  author: PostAuthor;
};

export type PostType = {
  id: number;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  authorId: number;
  author: PostAuthor;
  comments: PostComment[];
  likesCount: number;
  likedByMe: boolean;
};

export function listPosts(cursor?: number): Promise<PostType[]> {
  const query = cursor !== undefined ? `?cursor=${cursor}` : "";
  return apiFetch<PostType[]>(`/api/feed${query}`);
}

export function createPost(input: { description: string; imageUrl?: string }): Promise<PostType> {
  return apiFetch<PostType>("/api/feed", { method: "POST", body: input });
}

export function toggleLike(postId: number): Promise<{ liked: boolean }> {
  return apiFetch<{ liked: boolean }>(`/api/feed/${postId}/like`, { method: "POST" });
}

export function addComment(postId: number, text: string): Promise<PostComment> {
  return apiFetch<PostComment>(`/api/feed/${postId}/comments`, { method: "POST", body: { text } });
}

export function deletePost(postId: number): Promise<void> {
  return apiFetch<void>(`/api/feed/${postId}`, { method: "DELETE" });
}

export function uploadFeedImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("image", file);
  return apiFetch<{ url: string }>("/api/uploads/image", { method: "POST", body: formData });
}
