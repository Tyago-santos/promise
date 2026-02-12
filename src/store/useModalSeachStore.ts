import type { PostType } from "@/api";
import { create } from "zustand";

type ModalToggleType = {
  posts: Array<PostType>;
  modal: boolean;
  addModal: (add: boolean) => void;
  removeModal: (remove: boolean) => void;
  getPosts: (filterPost: PostType[]) => void;
};

export const useModalSearchSore = create<ModalToggleType>((set) => ({
  posts: [],
  modal: false,

  addModal: (add: boolean) => set(() => ({ modal: add })),
  removeModal: (remove: boolean) => set(() => ({ modal: remove })),
  getPosts: (filterPost) => set({ posts: filterPost }),
}));
