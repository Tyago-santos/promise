import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { FaRegComment, FaRegHeart } from "react-icons/fa";

const posts = [
  {
    id: 1,
    usuario: "maria_silva",
    nomeUsuario: "Maria Silva",
    imagens: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    image_post: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    descricao:
      "Dia lindo na praia! ☀️🌊 este é um cometarios sem graça só para escrever besteira. Dia lindo na praia! ☀️🌊 este é um cometarios sem graça só para escrever besteira",
    comentarios: [
      {
        usuario: "joao_pereira",
        texto: "Que lugar incrível!",
        data: "2024-01-15T10:30:00Z",
      },
      {
        usuario: "ana_santos",
        texto: "Adorei as fotos!",
        data: "2024-01-15T11:45:00Z",
      },
    ],
    likes: 245,
    dataPostagem: "2024-01-15T09:15:00Z",
  },

  {
    id: 2,
    usuario: "joao_pereira",
    nomeUsuario: "João Pereira",
    imagens: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    image_post: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    descricao: "Novo projeto finalizado! 🎨",
    comentarios: [
      {
        usuario: "carla_lima",
        texto: "Fantástico! Parabéns!",
        data: "2024-01-14T14:20:00Z",
      },
    ],
    likes: 178,
    dataPostagem: "2024-01-14T13:00:00Z",
  },

  {
    id: 3,
    usuario: "carla_lima",
    nomeUsuario: "Carla Lima",
    imagens: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    image_post: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    descricao: "Final de semana nas montanhas ⛰️",
    comentarios: [],
    likes: 312,
    dataPostagem: "2024-01-13T08:45:00Z",
  },

  {
    id: 4,
    usuario: "Maicon Santos",
    nomeUsuario: "Carla Lima",
    imagens: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    image_post: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    descricao: "Final de semana nas montanhas ⛰️",
    comentarios: [],
    likes: 312,
    dataPostagem: "2024-01-13T08:45:00Z",
  },

  {
    id: 5,
    usuario: "lucas_rocha",
    nomeUsuario: "Lucas Rocha",
    imagens: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    image_post: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
    descricao: "Treino pago hoje 💪🔥",
    comentarios: [],
    likes: 89,
    dataPostagem: "2024-01-12T18:20:00Z",
  },

  {
    id: 6,
    usuario: "ana_beatriz",
    nomeUsuario: "Ana Beatriz",
    imagens: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    image_post: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    descricao: "Estudando para novos desafios 📚✨",
    comentarios: [
      {
        usuario: "maria_silva",
        texto: "Vai com tudo!",
        data: "2024-01-12T20:10:00Z",
      },
    ],
    likes: 134,
    dataPostagem: "2024-01-12T17:40:00Z",
  },

  {
    id: 7,
    usuario: "rafael_mendes",
    nomeUsuario: "Rafael Mendes",
    imagens: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef",
    image_post: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    descricao: "Nada melhor que um café ☕",
    comentarios: [],
    likes: 56,
    dataPostagem: "2024-01-11T09:10:00Z",
  },

  {
    id: 8,
    usuario: "bruno_almeida",
    nomeUsuario: "Bruno Almeida",
    imagens: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    image_post: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    descricao: "Começando a semana com foco total 🚀",
    comentarios: [
      {
        usuario: "rafael_mendes",
        texto: "Boa semana! 👊",
        data: "2024-01-10T09:30:00Z",
      },
    ],
    likes: 102,
    dataPostagem: "2024-01-10T08:50:00Z",
  },

  {
    id: 9,
    usuario: "paula_oliveira",
    nomeUsuario: "Paula Oliveira",
    imagens: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    image_post: "https://images.unsplash.com/photo-1500534314209-a26db0f5c7f0",
    descricao: "Um pôr do sol para agradecer 🌅",
    comentarios: [],
    likes: 221,
    dataPostagem: "2024-01-09T18:10:00Z",
  },

  {
    id: 10,
    usuario: "diego_freitas",
    nomeUsuario: "Diego Freitas",
    imagens: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
    image_post: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    descricao: "Silêncio, natureza e paz 🌲",
    comentarios: [
      {
        usuario: "carla_lima",
        texto: "Que lugar lindo!",
        data: "2024-01-09T11:20:00Z",
      },
      {
        usuario: "maria_silva",
        texto: "Perfeito pra descansar 😍",
        data: "2024-01-09T12:05:00Z",
      },
    ],
    likes: 198,
    dataPostagem: "2024-01-09T10:40:00Z",
  },

  {
    id: 11,
    usuario: "fernanda_costa",
    nomeUsuario: "Fernanda Costa",
    imagens: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
    image_post: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    descricao: "Organizando ideias e projetos ✍️",
    comentarios: [],
    likes: 87,
    dataPostagem: "2024-01-08T16:30:00Z",
  },

  {
    id: 12,
    usuario: "thiago_nunes",
    nomeUsuario: "Thiago Nunes",
    imagens: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    image_post: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    descricao: "Noite de estudos e café ☕📖",
    comentarios: [
      {
        usuario: "ana_beatriz",
        texto: "Força! Vai valer a pena 💪",
        data: "2024-01-08T21:15:00Z",
      },
    ],
    likes: 143,
    dataPostagem: "2024-01-08T20:40:00Z",
  },

  {
    id: 13,
    usuario: "juliana_martins",
    nomeUsuario: "Juliana Martins",
    imagens: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    image_post: "https://images.unsplash.com/photo-1493244040629-496f6d136cc8",
    descricao: "Gratidão por mais um dia 🙏",
    comentarios: [],
    likes: 267,
    dataPostagem: "2024-01-07T19:00:00Z",
  },

  {
    id: 14,
    usuario: "eduardo_pacheco",
    nomeUsuario: "Eduardo Pacheco",
    imagens: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    image_post: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38",
    descricao: "Treino finalizado com sucesso 🏋️‍♂️",
    comentarios: [
      {
        usuario: "lucas_rocha",
        texto: "Monstro demais 💥",
        data: "2024-01-07T08:40:00Z",
      },
    ],
    likes: 119,
    dataPostagem: "2024-01-07T07:55:00Z",
  },
];

type DateTimeType = {
  time: number;
  date: string;
};

const PostContent = () => {
  const [photoFLoat, setPhtoFloat] = useState(false);
  const [photoFLoatValueScroll, setPhtoFloatValueScroll] = useState(0);
  const photoFloatRef = useRef<HTMLAnchorElement[]>([]);

  const fomartDate = (data: string): DateTimeType => {
    const now = new Date(data).getUTCSeconds();

    const timestampSegundos = Math.floor(Date.now() / 1000);
    const timestampSegundosDate = Math.floor(now / 1000);
    // const second = new Date();
    const day = new Date(data).getDate();
    const month = new Date(data).getMonth();
    const year = new Date(data).getFullYear();

    return {
      time: Math.floor(
        (timestampSegundos - timestampSegundosDate) / 60 / 60 / 60 / 24,
      ),

      date: `${day} / ${month + 1 <= 9 ? "0" + (month + 1) : month + 1} / ${year}`,
    };
  };

  useEffect(() => {
    const scrollPhoto = () => {
      const el = document.querySelector(".float") as HTMLDivElement;

      photoFloatRef.current?.forEach((float) => {
        if (window.pageYOffset + 60 > float?.offsetTop) {
          el.style.display = "flex";
          el.innerHTML = float?.outerHTML;
        } else if (window.pageYOffset < 60) {
          el.style.display = "none";
        }
      });
    };

    window.addEventListener("scroll", scrollPhoto);

    return () => window.removeEventListener("scroll", scrollPhoto);
  }, []);

  return (
    <div>
      {posts.map((post, i) => (
        <div
          key={post.id}
          className="flex pt-2 cursor-pointer px-4 gap-2 border-b border-gray-200"
        >
          <Link
            ref={(el) => (photoFloatRef.current[post.id] = el)}
            to="/perfil"
            className="overflow-hidden  max-h-12 max-w-12 flex rounded-full 
            items-center justify-center overflow-hidden  max-h-12 max-w-12  "
          >
            <img
              className="transform scale-[2]  max-h-full max-w-full  block"
              src={post.imagens}
              alt="Imagem de perfil"
            />
          </Link>
          <div className="">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm font-display">
                  {post.nomeUsuario}
                </span>
                <div className="size-1.5 bg-text rounded-full"></div>
                <span className="text-sm font-sans text-text">
                  há {fomartDate(post.dataPostagem).time} dias atrás{" "}
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
            >
              {/* <img
                className="max-h-full transform scale-[1.5] max-w-full block"
                src={post.image_post}
                alt=""
              /> */}
            </div>
            <div className="py-4 flex items-center justify-between  ">
              <div className="gap-4 flex">
                <button className="flex items-center gap-2 font-semibold font-display text-text">
                  <FaRegComment className="text-text size-5" />
                  {post.comentarios.length}
                </button>
                <button className="flex items-center gap-2 font-display font-semibold text-text">
                  <FaRegHeart className="text-text size-5" />
                  {post.likes}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Link
        to="/perfil"
        className="flex float rounded-full  fixed top-20 left-4 items-center justify-center 
        overflow-hidden  max-h-12 max-w-12  "
      >
        <img
          className="transform scale-[2]  max-h-full max-w-full  block"
          src="/image_perfil.png"
          alt="Imagem de perfil"
        />
      </Link>
    </div>
  );
};

export default PostContent;

//  <div className="relative">
//             <div
//               style={{
//                 backgroundImage: `url(${post.image_post})`,
//               }}
//               className="w-full h-96 bg-cover bg-center relative group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </div>
//           </div>
