import type { PostType, UserProfile } from "@/api";
import PostContent from "./PostContent";
import { LocateIcon } from "lucide-react";

type PropsType = {
  posts: PostType[];
  inforPerfil: UserProfile;
};

export default function InforPerfil({ posts, inforPerfil }: PropsType) {
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
              src={inforPerfil.photos[0]}
              alt="imagem de perfil"
            />
          </div>

          <button
            className={`
                 hover:bg-gradient-to-r/80 text-white shadow-md hover:shadow-lg 
                   bg-gradient-to-r from-pink-500 px-2 text-[10px] py-2 rounded-full to-purple-500
                `}
          >
            Mandar Mensagem
          </button>
          {/* <button
            className={`
                 hover:bg-gradient-to-r/80 text-text shadow-md hover:shadow-lg 
                   bg-gradient-to-r from-primary to-secondary px-4 
                   text-[10px] py-2 rounded-full 
                `}
          >
            Mandar mensagem
          </button> */}
        </div>

        <div>
          <div>
            <span className="font-bold my-2 text-xl block font-display">
              {inforPerfil.name}
            </span>
            <span className="font-semibold text-sm font-fans">
              {inforPerfil.age} anos
            </span>
          </div>

          <p className="my-2">{inforPerfil.bio}</p>

          <div className="flex items-center gap-2 text-text">
            <LocateIcon size={20} />
            {inforPerfil.location}
          </div>

          <div className="flex gap-2 flex-wrap font-semibold font-display my-3  ">
            {inforPerfil.interests.length > 0 &&
              inforPerfil.interests.map((inte) => (
                <span key={inte}>#{inte}</span>
              ))}
          </div>
        </div>
      </div>
      <div className="transform -translate-y-30">
        <PostContent posts={posts} />
      </div>
    </div>
  );
}
