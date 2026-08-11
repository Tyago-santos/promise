import { create } from "zustand";

type UserType = {
  name: string;
  email: string;
  password: string;
  age: number;
  genero: string;
  state: string;
  city: string;
  inters: Array<string>;
  image_perfil: string;
  imageFile: File | null;
  bio: string;
  cover: string;

  addImagePerfil: (fileImage: string) => void;
  addImageFilePerfil: (file: File | null) => void;
  addInteresgePerfil: (fileInters: string[]) => void;
  addAgePerfil: (fileAge: number) => void;
  addEmailPerfil: (fileEmail: string) => void;
  addPasswordPerfil: (filePassword: string) => void;
  addStatePerfil: (fileState: string) => void;
  addCityPerfil: (fileCity: string) => void;
  addNamePerfil: (fileName: string) => void;
  addBioPerfil: (fileBio: string) => void;
  addCoverPerfil: (fileCover: string) => void;
};

export const userStore = create<UserType>((set) => ({
  name: "",
  email: "",
  password: "",
  age: 0,
  genero: "",
  state: "",
  inters: [],
  image_perfil: "",
  imageFile: null,
  city: "",
  bio: "",
  cover: "",

  addImagePerfil: (fileImage: string) =>
    set(() => ({ image_perfil: fileImage })),

  addImageFilePerfil: (file: File | null) => set(() => ({ imageFile: file })),

  addInteresgePerfil: (fileInters: string[]) =>
    set(() => ({ inters: fileInters })),

  addAgePerfil: (fileAge: number) => set(() => ({ age: fileAge })),

  addEmailPerfil: (fileEmail: string) => set(() => ({ email: fileEmail })),
  addPasswordPerfil: (filePassword: string) => set(() => ({ password: filePassword })),
  addStatePerfil: (fileState: string) => set(() => ({ state: fileState })),
  addCityPerfil: (fileCity: string) => set(() => ({ city: fileCity })),
  addNamePerfil: (fileName: string) => set(() => ({ name: fileName })),
  addBioPerfil: (fileBio: string) => set(() => ({ bio: fileBio })),
  addCoverPerfil: (fileCover: string) => set(() => ({ cover: fileCover })),
}));
