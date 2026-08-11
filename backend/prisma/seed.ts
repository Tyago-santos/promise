import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type UserSeed = {
  name: string;
  email: string;
  age: number;
  sex: "man" | "woman";
  city: string;
  place: string;
  bio: string;
  interests: string[];
  photo: string;
  postImage: string;
  postText: string;
};

const users: UserSeed[] = [
  {
    name: "Maria Silva",
    email: "maria@example.com",
    age: 28,
    sex: "woman",
    city: "Sao Paulo",
    place: "SP",
    bio: "Amo viajar, cinema e cachorros. Buscando alguem para compartilhar momentos especiais.",
    interests: ["Viagens", "Cinema", "Cachorros", "Fotografia"],
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    postImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    postText: "Dia lindo na praia! ☀️🌊",
  },
  {
    name: "Joao Pereira",
    email: "joao@example.com",
    age: 32,
    sex: "man",
    city: "Rio de Janeiro",
    place: "RJ",
    bio: "Gosto de esportes, praia e musica ao vivo. Procuro alguem para novas aventuras.",
    interests: ["Esportes", "Praia", "Musica", "Tecnologia"],
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    postImage: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    postText: "Novo projeto finalizado! 🎨",
  },
  {
    name: "Carla Lima",
    email: "carla@example.com",
    age: 26,
    sex: "woman",
    city: "Belo Horizonte",
    place: "MG",
    bio: "Sou criativa, adoro arte e busco conexoes genuinas para viver bons momentos.",
    interests: ["Arte", "Design", "Yoga", "Fotografia"],
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    postImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    postText: "Final de semana nas montanhas ⛰️",
  },
  {
    name: "Lucas Rocha",
    email: "lucas@example.com",
    age: 29,
    sex: "man",
    city: "Curitiba",
    place: "PR",
    bio: "Treino todo dia e adoro um bom café depois. Procurando parceria pra vida.",
    interests: ["Academia", "Culinaria", "Cinema"],
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    postImage: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
    postText: "Treino pago hoje 💪🔥",
  },
  {
    name: "Ana Beatriz",
    email: "ana@example.com",
    age: 25,
    sex: "woman",
    city: "Porto Alegre",
    place: "RS",
    bio: "Estudante, curiosa e sempre em busca de um bom livro ou uma boa conversa.",
    interests: ["Leitura", "Series", "Viagens"],
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    postImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    postText: "Estudando para novos desafios 📚✨",
  },
  {
    name: "Rafael Mendes",
    email: "rafael@example.com",
    age: 31,
    sex: "man",
    city: "Salvador",
    place: "BA",
    bio: "Apaixonado por café, praia e boas conversas ao entardecer.",
    interests: ["Cafe", "Praia", "Musica"],
    photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef",
    postImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    postText: "Nada melhor que um café ☕",
  },
  {
    name: "Bruno Almeida",
    email: "bruno@example.com",
    age: 30,
    sex: "man",
    city: "Fortaleza",
    place: "CE",
    bio: "Foco em objetivos, mas sempre com tempo pra quem importa.",
    interests: ["Empreendedorismo", "Esportes", "Viagens"],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    postImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    postText: "Começando a semana com foco total 🚀",
  },
  {
    name: "Paula Oliveira",
    email: "paula@example.com",
    age: 27,
    sex: "woman",
    city: "Recife",
    place: "PE",
    bio: "Gosto de por do sol, praia e boas risadas.",
    interests: ["Praia", "Fotografia", "Natureza"],
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    postImage: "https://images.unsplash.com/photo-1500534314209-a26db0f5c7f0",
    postText: "Um pôr do sol para agradecer 🌅",
  },
  {
    name: "Diego Freitas",
    email: "diego@example.com",
    age: 33,
    sex: "man",
    city: "Florianopolis",
    place: "SC",
    bio: "Amante da natureza e da tranquilidade. Buscando alguem pra dividir trilhas.",
    interests: ["Trilhas", "Natureza", "Fotografia"],
    photo: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
    postImage: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    postText: "Silêncio, natureza e paz 🌲",
  },
  {
    name: "Fernanda Costa",
    email: "fernanda@example.com",
    age: 28,
    sex: "woman",
    city: "Brasilia",
    place: "DF",
    bio: "Organizada, curiosa e sempre com um projeto novo na cabeça.",
    interests: ["Design", "Escrita", "Cafe"],
    photo: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
    postImage: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    postText: "Organizando ideias e projetos ✍️",
  },
  {
    name: "Thiago Nunes",
    email: "thiago@example.com",
    age: 34,
    sex: "man",
    city: "Campinas",
    place: "SP",
    bio: "Estudioso, gosto de café forte e boas noites de leitura.",
    interests: ["Leitura", "Cafe", "Tecnologia"],
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    postImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    postText: "Noite de estudos e café ☕📖",
  },
];

const matchPairs: Array<[string, string, string[]]> = [
  [
    "maria@example.com",
    "joao@example.com",
    ["Oi! Curti seu perfil 😄", "Oi Maria! O seu também, bora marcar algo?", "Bora sim! Que tal um café amanhã?"],
  ],
  [
    "carla@example.com",
    "lucas@example.com",
    ["Oi Lucas, adorei suas fotos de trilha!", "Opa Carla, obrigado! Você também curte trilha?"],
  ],
  [
    "ana@example.com",
    "rafael@example.com",
    ["Rafael, vi que você curte café tanto quanto eu ☕", "Ana! Combinamos demais então haha"],
  ],
  ["paula@example.com", "diego@example.com", ["Diego, que fotos incríveis de natureza!"]],
];

async function main() {
  await prisma.message.deleteMany();
  await prisma.match.deleteMany();
  await prisma.swipe.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("123456", 10);

  // Sequencial (nao Promise.all): createdAt precisa refletir a ordem da
  // lista, senao a ordenacao por data no feed/discover fica embaralhada.
  const createdUsers = [];
  for (const user of users) {
    createdUsers.push(
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          passwordHash,
          age: user.age,
          sex: user.sex,
          city: user.city,
          place: user.place,
          bio: user.bio,
          interests: user.interests.join(","),
          photos: { create: [{ url: user.photo, order: 0 }] },
        },
      }),
    );
  }

  const byEmail = new Map(createdUsers.map((user) => [user.email, user]));

  const createdPosts = [];
  for (const [index, user] of users.entries()) {
    const author = byEmail.get(user.email)!;
    const commenter = createdUsers[(index + 1) % createdUsers.length];
    const likers = [
      createdUsers[(index + 2) % createdUsers.length],
      createdUsers[(index + 3) % createdUsers.length],
    ];

    createdPosts.push(
      await prisma.post.create({
        data: {
          authorId: author.id,
          description: user.postText,
          imageUrl: user.postImage,
          comments: { create: [{ authorId: commenter.id, text: "Adorei! 😍" }] },
          likes: { create: likers.map((liker) => ({ userId: liker.id })) },
        },
      }),
    );
  }

  for (const [emailA, emailB, messages] of matchPairs) {
    const userA = byEmail.get(emailA)!;
    const userB = byEmail.get(emailB)!;

    await prisma.swipe.create({ data: { swiperId: userA.id, swipedId: userB.id, liked: true } });
    await prisma.swipe.create({ data: { swiperId: userB.id, swipedId: userA.id, liked: true } });

    const [userAId, userBId] = [userA.id, userB.id].sort((a, b) => a - b);
    const match = await prisma.match.create({ data: { userAId, userBId } });

    await prisma.message.createMany({
      data: messages.map((text, i) => ({
        matchId: match.id,
        senderId: i % 2 === 0 ? userA.id : userB.id,
        text,
      })),
    });
  }

  // Alguns swipes sem match reciproco, para o discover nao ficar vazio nem todo mundo dando match.
  const [maria, bruno, fernanda, thiago] = [
    byEmail.get("maria@example.com")!,
    byEmail.get("bruno@example.com")!,
    byEmail.get("fernanda@example.com")!,
    byEmail.get("thiago@example.com")!,
  ];
  await prisma.swipe.create({ data: { swiperId: maria.id, swipedId: bruno.id, liked: true } });
  await prisma.swipe.create({ data: { swiperId: fernanda.id, swipedId: thiago.id, liked: false } });

  console.log(`Seed concluído: ${createdUsers.length} usuários, ${createdPosts.length} posts, ${matchPairs.length} matches.`);
  console.log("Login de teste: qualquer email acima (ex: maria@example.com) com senha 123456");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
