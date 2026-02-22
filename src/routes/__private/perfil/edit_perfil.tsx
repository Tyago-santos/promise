import HeaderPerfil from "@/components/HeaderPerfil";

import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Camera, UserStar, X } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";

import resizeImage from "@/util/lib/resizeImage";
import { userStore } from "@/store/userStore";

export const Route = createFileRoute("/__private/perfil/edit_perfil")({
  component: RouteComponent,
  beforeLoad: () => ({
    head: {
      meta: [
        {
          title: "Edite Perfil | Promise",
          description: "Faça cadastro na plataforma Promise",
          keywords: "cadastro, autenticação, promise",
        },
      ],
    },
  }),
});

function RouteComponent() {
  const inputImageRefPerfil = useRef<HTMLInputElement | null>(null);
  const inputImageRefCover = useRef<HTMLInputElement | null>(null);

  const [bioState, setBioState] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();

  const router = useRouter();

  const [selectedImagePerfil, setSelectedImagePerfil] = useState<string | null>(
    null,
  );
  const [selectedImageCover, setSelectedImageCover] = useState<string | null>(
    null,
  );

  const cover = userStore((state) => state.cover);
  const addCover = userStore((state) => state.addCoverPerfil);
  const imagePerfil = userStore((state) => state.image_perfil);

  const nameUser = userStore((state) => state.addNamePerfil);
  const bioUser = userStore((state) => state.addBioPerfil);

  const handleChangeImgPerfil = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const compressedFile = await resizeImage(file);

      const imageSrc = URL.createObjectURL(compressedFile);
      if (selectedImagePerfil) URL.revokeObjectURL(selectedImagePerfil);

      setSelectedImagePerfil(imageSrc);
    }
  };

  const handleChangeImgCover = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const compressedFile = await resizeImage(file);

      const imageSrc = URL.createObjectURL(compressedFile);
      addCover(imageSrc);

      if (selectedImageCover) URL.revokeObjectURL(selectedImageCover);

      setSelectedImageCover(imageSrc);
    }
  };

  const handleClickChange = () => {
    if (bioState) bioUser(bioState);

    if (name) nameUser(name);

    console.log(name);
    console.log(bioState);

    router.history.back();
  };
  return (
    <main>
      <HeaderPerfil name="Editar perfil" />

      <div className="m-auto max-w-3xl ">
        <div className="h-65 z-99   md:h-full z-99  ">
          <div className="relative">
            <button
              onClick={() => inputImageRefCover.current?.click()}
              className="absolute top-0 right-0 bottom-0 left-0 bg-black/70 
          w-full h-full flex justify-center pt-20 cursor-pointer     gap-4 "
            >
              <Camera className="size-8 z-100 text-white " />
            </button>
            <img
              className="max-h-full"
              src={cover ? `${cover}` : "/image_post2.jpg"}
              alt="poster"
            />

            <input
              ref={inputImageRefCover}
              onChange={handleChangeImgCover}
              type="file"
              accept="image/*"
            />
          </div>

          <div className=" bg-white transform -translate-y-25   md:-translate-y-75  pt-3 h-30 pb-3    px-4">
            <div className="flex justify-between items-center ">
              <div
                className="h-20 w-20 -mt-8 rounded-full 
        overflow-hidden flex items-center justify-center  relative  border-3 border-white"
              >
                <button
                  onClick={() => inputImageRefPerfil.current?.click()}
                  className="absolute bottom-0 right-0 top-0 left-0 
                bg-black/70 w-full h-full z-100 cursor-pointer "
                >
                  <Camera className="size-5 z-100 text-white absolute top-[35%] right-[40%] " />
                </button>

                <img
                  className="max-w-full max-h-full    scale-[1.5] "
                  src={imagePerfil ? `${imagePerfil}` : "/image_perfil.png"}
                  alt="imagem de perfil"
                />

                <input
                  className="hiddem md:hidden"
                  ref={inputImageRefPerfil}
                  onChange={handleChangeImgPerfil}
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 m-auto md:-translate-y-75 bg-white ">
          <label className="font-fans">
            Nome
            <input
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Digite seu nome"
              className="block bg-gray-300 p-4 rounded-sm outline-none 
            focus:border-blue-400 border-2 border-transparent font-sans mt-3 w-full"
            />
          </label>

          <label className="font-fans my-4 block">
            Bio
            <textarea
              onChange={(e) => setBioState(e.target.value)}
              placeholder="Fale um pouco sobre você"
              className="block bg-gray-300 h-50 resize-none outline-none p-4 
            rounded-sm font-sans mt-3 w-full  
            focus:border-blue-400 border-2 border-transparent"
              name="bio"
            ></textarea>
          </label>

          <input
            onClick={handleClickChange}
            className="bg-gradient-to-r from-primary to-secondary 
             hover:from-primary/90 hover:to-secondary/90
             active:scale-[0.98]
             transform transition-all duration-200
             shadow-lg hover:shadow-xl
             block w-full cursor-pointer mt-3 p-4 
             rounded-lg font-display font-semibold 
             text-text border-0
             focus:outline-none focus:ring-2 focus:ring-secondary/50 w-full "
            type="submit"
            value="Salvar alteração "
          />
        </div>
      </div>
    </main>
  );
}
