import { createFileRoute } from "@tanstack/react-router";

import HeaderPefil from "@/components/HeaderPerfil";
import InforPerfil from "@/components/InforPerfil";

export const Route = createFileRoute("/__private/perfil/$perfil")({
  component: RouteComponent,
});

type ComentariosType = {
  usuario: string;
  texto: string;
  data: string;
};

type PostType = {
  id: number;
  usuario: string;
  nomeUsuario: string;
  imagens: string;
  image_post: string;
  descricao: string;
  comentarios: ComentariosType[];
  likes: number;
  dataPostagem: string;
};

const posts: PostType[] = [
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

function RouteComponent() {
  return (
    <div>
      <HeaderPefil />
      <InforPerfil posts={posts} path="/perfil/$perfil" />
    </div>
  );
}
