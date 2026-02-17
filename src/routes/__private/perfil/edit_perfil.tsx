import HeaderPerfil from "@/components/HeaderPerfil";

import { createFileRoute } from "@tanstack/react-router";
import { Camera, X } from "lucide-react";

export const Route = createFileRoute("/__private/perfil/edit_perfil")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <HeaderPerfil name="Editar perfil" />

      <div className="m-auto max-w-3xl ">
        <div className="h-65 z-99   md:h-full z-99  ">
          <div className="relative">
            <div
              className="absolute top-0 right-0 bottom-0 left-0 bg-black/70 
          w-full h-full flex justify-center pt-20    gap-4 "
            >
              <Camera className="size-8 z-100 text-white " />
              <X className="size-8 z-100 text-white " />
            </div>
            <img className="max-h-full" src="/image_post2.jpg" alt="poster" />
          </div>

          <div className=" bg-white transform -translate-y-25   md:-translate-y-75  pt-3 h-30 pb-3    px-4">
            <div className="flex justify-between items-center ">
              <div
                className="h-20 w-20 -mt-8 rounded-full 
        overflow-hidden flex items-center justify-center  relative  border-3 border-white"
              >
                <div className="absolute bottom-0 right-0 top-0 left-0 bg-black/70 w-full h-full z-100 ">
                  <Camera className="size-5 z-100 text-white absolute top-[35%] right-[40%] " />
                </div>
                <img
                  className="max-w-full max-h-full    scale-[1.5] "
                  src="/image_perfil.png"
                  alt="imagem de perfil"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 m-auto md:-translate-y-75 bg-white ">
          <label className="font-fans" htmlFor="name">
            Nome
            <input
              name="name"
              placeholder="Digite seu nome"
              className="block bg-gray-300 p-4 rounded-sm outline-none 
            focus:border-blue-400 border-2 border-transparent font-sans mt-3 w-full"
            />
          </label>

          <label className="font-fans my-4 block" htmlFor="bio">
            Bio
            <textarea
              placeholder="Fale um pouco sobre você"
              className="block bg-gray-300 h-50 resize-none outline-none p-4 
            rounded-sm font-sans mt-3 w-full  
            focus:border-blue-400 border-2 border-transparent"
              name="bio"
            ></textarea>
          </label>

          <input
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
