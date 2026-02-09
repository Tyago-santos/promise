import type { PostType } from "@/api";
import PostContent from "./PostContent";

type PropsType = {
  path: string;
  posts: PostType[];
};

export default function InforPerfil({ path, posts }: PropsType) {
  return (
    <div className="">
      <div className="h-60 z-99">
        <img className="max-h-full " src="/image_post2.jpg" alt="poster" />
      </div>

      <div className=" bg-white transform -translate-y-30 border-b border-gray-200 pb-3    px-4">
        <div className="flex justify-between items-center">
          <div
            className="h-20 w-20 -mt-8 rounded-full 
        overflow-hidden flex items-center justify-center   border-3 border-white"
          >
            <img
              className="max-w-full max-h-full    scale-[1.5] "
              src="image_perfil.png"
              alt="imagem de perfil"
            />
          </div>

          <button
            className={`
                  px-4 py-1.5 rounded-full font-medium text-sm transition-all
                    bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg
                `}
          >
            Editar perfil
          </button>
        </div>

        <div>
          <div>
            <span className="font-bold my-2 text-xl block font-display">
              Tiago Santos
            </span>
            <span className="font-smibod text-sm font-fans">25 anos</span>
          </div>

          <p className="my-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam
            molestiae, neque, nihil commodi, ducimus laborum rerum deleniti
            aliquid veniam quia at? Excepturi, quasi. Fugiat dolor ea explicabo
            illum beatae delectus.
          </p>
        </div>
      </div>
      <div className="transform -translate-y-30">
        <PostContent path={path} posts={posts} />
      </div>
    </div>
  );
}
