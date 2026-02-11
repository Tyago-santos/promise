import { Link } from "@tanstack/react-router";

import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";

import { type PostType } from "@/api";
import { memo, useState } from "react";
// import { useReward } from "react-rewards";

type PropsType = {
  path?: string;

  posts: PostType[];
};

const PostContent = ({ path, posts }: PropsType) => {
  const [likedByIndex, setLikedByIndex] = useState<Record<number, boolean>>({});

  // 2. Configurar quais emojis aparecerão
  // const { reward, isAnimating } = useReward("emojiReward", "emoji", {
  //   emoji: ["❤️", "💖", "💗", "✨"], // Mix de corações
  //   startVelocity: 45, // Explosão inicial forte
  //   elementCount: 40, // Quantidade generosa
  //   spread: 80, // Abertura do leque
  //   decay: 0.95, // Mantém a velocidade por um tempo
  //   elementSize: 25,
  // });

  const handleLink = (index: number) => {
    const wasLiked = !!likedByIndex[index];
    setLikedByIndex((prev) => ({ ...prev, [index]: !wasLiked }));

    if (wasLiked) {
      posts[index].likes--;
    } else {
      posts[index].likes++;
    }
  };

  const fomartDate = (data: string) => {
    const now = new Date(data).getUTCSeconds();

    const timestampSegundos = Math.floor(Date.now() / 1000);
    const timestampSegundosDate = Math.floor(now / 1000);

    return Math.floor(
      (timestampSegundos - timestampSegundosDate) / 60 / 60 / 60 / 24,
    );
  };
  return (
    <div>
      {posts.map((post, i) => (
        <div
          key={post.id}
          className="flex border-gray-200 border-b  pt-2 cursor-pointer px-4 gap-2 "
        >
          <Link
            to={path}
            className="overflow-hidden transition-transform duration-1000  max-h-12 max-w-12 flex rounded-full 
            items-center justify-center overflow-hidden  max-h-12 max-w-12  "
          >
            <img
              className="transform scale-[2]   max-h-full max-w-full  block"
              src={post.imagens}
              alt="Imagem de perfil"
            />
          </Link>
          <div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm font-display">
                  {post.nomeUsuario}
                </span>
                <div className="size-1.5 bg-text rounded-full"></div>
                <span className="text-sm font-sans text-text">
                  há {fomartDate(post.dataPostagem)} dias atrás{" "}
                </span>
              </div>
              <p className="block  my-4 text-wrap">{post.descricao}</p>
            </div>
            <div
              style={{
                backgroundImage: `url(${post.image_post})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="rounded-md bg-gray-300 overflow-hidden h-40 w-65"
            ></div>
            <div className="py-4 flex items-center justify-between  ">
              <div className="gap-4 flex">
                <button className="flex items-center gap-2 font-semibold font-display text-text">
                  <FaRegComment className="text-text size-5" />
                  {post.comentarios.length}
                </button>
                <button
                  // disabled={isAnimating}
                  onClick={() => handleLink(i)}
                  className="flex  items-center gap-2 font-display font-semibold text-text"
                >
                  {likedByIndex[i] ? (
                    <FaHeart className="text-red-600 size-5" />
                  ) : (
                    <FaRegHeart className="text-text size-5" />
                  )}

                  {/* <span
                    style={{ position: "fixed", top: 0, left: "50%" }}
                    id="emojiReward"
                  /> */}
                  {post.likes}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(PostContent);
