import type { PostType } from "@/api";
import PostContent from "./PostContent";
import { LocateIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

type PropsType = {
  posts: PostType[];
  user: string;
};

export default function InforPerfil({ posts, user }: PropsType) {
  const newUser = JSON.parse(user);

  return (
    <div className="m-auto max-w-3xl">
      <div className="h-65 md:h-full z-99">
        <img
          className="max-h-full "
          src={newUser.cover ? newUser.cover : "/image_post1.jpg"}
          alt="poster"
        />
      </div>

      <div className=" bg-white transform -translate-y-30 md:-translate-y-75  min-h-80 border-b pt-3 border-gray-200 pb-3    px-4">
        <div className="flex justify-between items-center">
          <div
            className="h-20 w-20 -mt-8 rounded-full 
        overflow-hidden flex items-center justify-center   border-3 border-white"
          >
            <img
              className="max-w-full max-h-full    scale-[1.5] "
              src={newUser.img}
              alt="imagem de perfil"
            />
          </div>

          <Link
            to="/perfil/edit_perfil"
            className={`
                 hover:bg-gradient-to-r/80 text-white shadow-md hover:shadow-lg 
                   bg-gradient-to-r from-pink-500 px-2 text-[10px] md:text-lg py-2 
                   rounded-full to-purple-500 md:px-10
                `}
          >
            Editar perfil
          </Link>
        </div>

        <div>
          <div>
            <span className="font-bold my-2 text-xl block font-display">
              {newUser.name}
            </span>
            <span className="font-semibold text-sm font-fans">
              {newUser.age} anos
            </span>
          </div>

          <p className="my-2">{newUser.bio}</p>

          <div className="flex items-center gap-2 text-text">
            <LocateIcon size={20} />
            {newUser.state} - {newUser.city}
          </div>

          <div className="flex gap-2 flex-wrap font-semibold font-display my-3  ">
            {newUser.inters.map((int: string) => (
              <p>#{int}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="transform -translate-y-25 md:-translate-y-50 ">
        <PostContent posts={posts} />
      </div>
    </div>
  );
}
