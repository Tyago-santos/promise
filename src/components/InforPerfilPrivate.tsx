import type { PostType, UserProfile } from "@/api";
import PostContent from "./PostContent";
import { LocateIcon } from "lucide-react";

type PropsType = {
  posts: PostType[];
};

export default function InforPerfil({ posts }: PropsType) {
  return (
    <div className="">
      <div className="h-65 z-99">
        <img className="max-h-full " src="/image_post2.jpg" alt="poster" />
      </div>

      <div className=" bg-white transform -translate-y-30 border-b pt-3 border-gray-200 pb-3    px-4">
        <div className="flex justify-between items-center">
          <div
            className="h-20 w-20 -mt-8 rounded-full 
        overflow-hidden flex items-center justify-center   border-3 border-white"
          >
            <img
              className="max-w-full max-h-full    scale-[1.5] "
              src="/image_perfil.png"
              alt="imagem de perfil"
            />
          </div>

          <button
            className={`
                 hover:bg-gradient-to-r/80 text-white shadow-md hover:shadow-lg 
                   bg-gradient-to-r from-pink-500 px-2 text-[10px] py-2 rounded-full to-purple-500
                `}
          >
            Editar Perfil
          </button>
        </div>

        <div>
          <div>
            <span className="font-bold my-2 text-xl block font-display">
              Tiago dos Santos da Silva
            </span>
            <span className="font-semibold text-sm font-fans">25 anos</span>
          </div>

          <p className="my-2">
            Amo viajar, cinema e cachorros. Busco alguem para compartilhar
            momentos especiais. Dia lindo na praia! ☀️🌊 este é um cometarios
            sem graça só para escrever besteira. Dia lindo na praia! ☀️🌊 este é
            um cometarios sem graça só para escrever besteira
          </p>

          <div className="flex items-center gap-2 text-text">
            <LocateIcon size={20} />
            Bahia - vitória da conquista
          </div>

          <div className="flex gap-2 flex-wrap font-semibold font-display my-3  ">
            #Esportes #Praia #Musica #Tecnologia
          </div>
        </div>
      </div>
      <div className="transform -translate-y-30">
        <PostContent posts={posts} />
      </div>
    </div>
  );
}
