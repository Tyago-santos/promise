import { create } from "zustand";

type UserType = {
  name: string;
  email: string;
  age: number;
  genero: string;
  state: string;
  city: string;
  inters: Array<string>;
  image_perfil: string;

  addImagePerfil: (fileImage: string) => void;
  addInteresgePerfil: (fileInters: string[]) => void;
};

export const userStore = create<UserType>((set) => ({
  name: "",
  email: "",
  age: 0,
  genero: "",
  state: "",
  inters: [],
  image_perfil: "",
  city: "",

  addImagePerfil: (fileImage: string) =>
    set(() => ({ image_perfil: fileImage })),

  addInteresgePerfil: (fileInters: string[]) =>
    set(() => ({ inters: fileInters })),
}));
