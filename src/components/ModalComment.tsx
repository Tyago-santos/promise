import type { PostType } from "@/api";
import { Send } from "lucide-react";

type PropsType = {
  post: PostType;
};
export default function ModalComment({ post }: PropsType) {
  console.log(post);
  return (
    <div className=" flex flex-col md:flex-row bg-black/80  fixed top-0 right-0 bottom-0 left-0">
      <div className="flex items-center  p-4 justify-center">
        <img className=" rounded-md" src={post.image_post} />
      </div>
      <div className="bg-white p-4 h-full  ">
        {post.comentarios.map((p) => (
          <div
            className="overflow-scroll  flex items-center  gap-2  "
            key={p.data}
          >
            <img
              className="size-15 rounded-full object-cove"
              src={post.imagens}
            />
            <div>
              <span>{p.usuario}</span>
            </div>
          </div>
        ))}

        <p>{post.descricao}</p>

        <div className="flex gap-2 mt-6 absolute right-5 left-5 bottom-5">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            className={`flex-1 px-4 py-2 shadow-lg inset-shadow-sm rounded-lg 
                focus:outline-none transform duration-300  translateY(-400px) 
                focus:ring-2 focus:ring-blue-500 transition-transform`}
          />
          <button className=" p-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:bg-blue-600 transition">
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
