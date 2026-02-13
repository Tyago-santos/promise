type ComentariosType = {
  usuario: string;
  texto: string;
  data: string;
};

export type PostType = {
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

export type Msg = {
  id: string;
  text: string;
  position: "left" | "right";
  date: Date;
};

export type ContactType = {
  id: number;
  nome: string;
  username: string;
  avatar: string;
  ultimaMensagem: string;
  ultimoHorario: string;
  naoLidas: number;
  online: boolean;
  mensagens: Msg[];
};

export interface UserProfile {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  distance: number;
  interests: string[];
  photos: string[];
  lastActive: string;
  compatibility: number;
}

type ProfileSeed = Omit<UserProfile, "id" | "name" | "photos">;

const profileSeeds: ProfileSeed[] = [
  {
    age: 28,
    location: "Sao Paulo",
    bio: "Amo viajar, cinema e cachorros. Busco alguem para compartilhar momentos especiais.",
    distance: 5,
    interests: ["Viagens", "Cinema", "Cachorros", "Fotografia"],
    lastActive: "online",
    compatibility: 85,
  },
  {
    age: 32,
    location: "Rio de Janeiro",
    bio: "Gosto de esportes, praia e musica ao vivo. Procuro alguem para novas aventuras.",
    distance: 12,
    interests: ["Esportes", "Praia", "Musica", "Tecnologia"],
    lastActive: "5min",
    compatibility: 72,
  },
  {
    age: 26,
    location: "Belo Horizonte",
    bio: "Sou criativa, adoro arte e busco conexoes genuinas para viver bons momentos.",
    distance: 8,
    interests: ["Arte", "Design", "Yoga", "Fotografia"],
    lastActive: "2h",
    compatibility: 90,
  },
  {
    age: 30,
    location: "Brasilia",
    bio: "Gosto de leitura, culinaria e trilhas. Quero construir uma historia com parceria.",
    distance: 15,
    interests: ["Leitura", "Culinaria", "Trilhas", "Saude"],
    lastActive: "online",
    compatibility: 78,
  },
];

export const allProfiles: UserProfile[] = [];

export const posts: PostType[] = [
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

allProfiles.push(
  ...posts.map((post, index) => {
    const seed = profileSeeds[index % profileSeeds.length];

    return {
      id: post.id,
      name: post.nomeUsuario,
      age: seed.age,
      location: seed.location,
      bio: `${seed.bio} ${post.descricao}`,
      distance: seed.distance + (index % 4),
      interests: seed.interests,
      photos: [post.imagens],
      lastActive: seed.lastActive,
      compatibility: Math.min(99, seed.compatibility + (index % 6)),
    };
  }),
);

export const contacts: ContactType[] = [
  {
    id: 1,
    nome: "Maria Silva",
    username: "maria_silva",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    ultimaMensagem: "Cheguei em casa, me chama depois.",
    ultimoHorario: "09:12",
    naoLidas: 2,
    online: true,
    mensagens: [
      {
        id: "m1",
        text: "Oi, consegui parar um pouco agora. Como foi seu dia at� aqui? Oi, consegui parar um pouco agora. Como foi seu dia at� aqui?",
        position: "left",
        date: new Date(),
      },
      {
        id: "m2",
        text: "Foi corrido, mas deu tudo certo. Mais tarde te conto com calma.",
        position: "right",
        date: new Date(),
      },
    ],
  },
  {
    id: 2,
    nome: "Joao Pereira",
    username: "joao_pereira",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    ultimaMensagem: "Fechou! Amanhã te aviso.",
    ultimoHorario: "08:44",
    naoLidas: 0,
    online: true,
    mensagens: [
      {
        id: "m1",
        text: "Passei no mercado e lembrei daquela lista que voc� mandou.",
        position: "left",
        date: new Date(),
      },
      {
        id: "m2",
        text: "Boa! Depois me manda o que faltou, que eu resolvo.",
        position: "right",
        date: new Date(),
      },
    ],
  },
  {
    id: 3,
    nome: "Carla Lima",
    username: "carla_lima",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    ultimaMensagem: "Enviei os arquivos no email.",
    ultimoHorario: "Ontem",
    naoLidas: 1,
    online: true,
    mensagens: [
      {
        id: "m1",
        text: "Acabei de sair da reuni�o, foi mais longa do que eu esperava.",
        position: "left",
        date: new Date(),
      },
      {
        id: "m2",
        text: "Imagino. Quando puder, me d� um resumo do que ficou decidido.",
        position: "right",
        date: new Date(),
      },
    ],
  },
  {
    id: 4,
    nome: "Rafael Mendes",
    username: "rafael_mendes",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef",
    ultimaMensagem: "Valeu pela ajuda!",
    ultimoHorario: "Ontem",
    naoLidas: 0,
    online: true,
    mensagens: [
      {
        id: "m1",
        text: "Cheguei agora e estou organizando as coisas aqui em casa.",
        position: "left",
        date: new Date(),
      },
      {
        id: "m2",
        text: "Tranquilo! Quando estiver livre, a gente conversa.",
        position: "right",
        date: new Date(),
      },
    ],
  },
  {
    id: 5,
    nome: "Ana Beatriz",
    username: "ana_beatriz",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    ultimaMensagem: "Podemos marcar na sexta?",
    ultimoHorario: "Seg",
    naoLidas: 3,
    online: true,
    mensagens: [
      {
        id: "m1",
        text: "Pensei em marcar algo mais cedo na sexta, pode ser?",
        position: "left",
        date: new Date(),
      },
      {
        id: "m2",
        text: "Pode sim, me passa o hor�rio certinho que eu confirmo.",
        position: "right",
        date: new Date(),
      },
    ],
  },
  {
    id: 6,
    nome: "Bruno Almeida",
    username: "bruno_almeida",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    ultimaMensagem: "Estou a caminho.",
    ultimoHorario: "Seg",
    naoLidas: 0,
    online: false,
    mensagens: [
      {
        id: "m1",
        text: "Estou quase chegando, o tr�nsito abriu agora.",
        position: "left",
        date: new Date(),
      },
      {
        id: "m2",
        text: "Beleza, estou te esperando aqui na entrada.",
        position: "right",
        date: new Date(),
      },
    ],
  },
  {
    id: 7,
    nome: "Paula Oliveira",
    username: "paula_oliveira",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    ultimaMensagem: "Boa noite! Amanhã falamos.",
    ultimoHorario: "Dom",
    naoLidas: 0,
    online: false,
    mensagens: [
      {
        id: "m1",
        text: "Boa noite! Amanh� tenho um hor�rio mais livre pra falar.",
        position: "left",
        date: new Date(),
      },
      {
        id: "m2",
        text: "Perfeito, me chama quando acordar.",
        position: "right",
        date: new Date(),
      },
    ],
  },
  {
    id: 8,
    nome: "Diego Freitas",
    username: "diego_freitas",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
    ultimaMensagem: "Vamos fechar isso hoje?",
    ultimoHorario: "Dom",
    naoLidas: 4,
    online: false,
    mensagens: [
      {
        id: "m1",
        text: "Voc� acha melhor fechar isso hoje ou deixar pra amanh�?",
        position: "left",
        date: new Date(),
      },
      {
        id: "m2",
        text: "Se der, vamos resolver hoje pra ficar tranquilo.",
        position: "right",
        date: new Date(),
      },
    ],
  },
  {
    id: 9,
    nome: "Fernanda Costa",
    username: "fernanda_costa",
    avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
    ultimaMensagem: "Ok, combinado.",
    ultimoHorario: "Sab",
    naoLidas: 0,
    online: false,
    mensagens: [
      {
        id: "m1",
        text: "Ok, combinado. Vou separar tudo e te aviso.",
        position: "left",
        date: new Date(),
      },
      {
        id: "m2",
        text: "Obrigado! Qualquer coisa me chama.",
        position: "right",
        date: new Date(),
      },
    ],
  },
  {
    id: 10,
    nome: "Thiago Nunes",
    username: "thiago_nunes",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    ultimaMensagem: "Já subi no drive.",
    ultimoHorario: "Sex",
    naoLidas: 2,
    online: false,
    mensagens: [
      {
        id: "m1",
        text: "J� subi no drive e organizei por pastas pra facilitar.",
        position: "left",
        date: new Date(),
      },
      {
        id: "m2",
        text: "�timo, vou conferir mais tarde e te retorno.",
        position: "right",
        date: new Date(),
      },
    ],
  },
];

