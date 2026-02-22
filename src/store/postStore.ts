import { posts, type PostType } from "@/api";
import { create } from "zustand";

type PostStoreType = {
  posts: PostType[];
  addPost: (post: PostType) => void;
};

export const postStore = create<PostStoreType>((set) => ({
  posts,
  addPost: (post: PostType) =>
    set((state) => ({ posts: [...state.posts, post] })),
}));
