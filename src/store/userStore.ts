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
  bio: string;
  cover: string;

  addImagePerfil: (fileImage: string) => void;
  addInteresgePerfil: (fileInters: string[]) => void;
  addAgePerfil: (fileAge: number) => void;
  addEmailPerfil: (fileEmail: string) => void;
  addStatePerfil: (fileState: string) => void;
  addCityPerfil: (fileCity: string) => void;
  addNamePerfil: (fileName: string) => void;
  addBioPerfil: (fileBio: string) => void;
  addCoverPerfil: (fileCover: string) => void;
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
  bio: "",
  cover: "",

  addImagePerfil: (fileImage: string) =>
    set(() => ({ image_perfil: fileImage })),

  addInteresgePerfil: (fileInters: string[]) =>
    set(() => ({ inters: fileInters })),

  addAgePerfil: (fileAge: number) => set(() => ({ age: fileAge })),

  addEmailPerfil: (fileEmail: string) => set(() => ({ email: fileEmail })),
  addStatePerfil: (fileState: string) => set(() => ({ state: fileState })),
  addCityPerfil: (fileCity: string) => set(() => ({ city: fileCity })),
  addNamePerfil: (fileName: string) => set(() => ({ name: fileName })),
  addBioPerfil: (fileBio: string) => set(() => ({ bio: fileBio })),
  addCoverPerfil: (fileCover: string) => set(() => ({ cover: fileCover })),
}));
