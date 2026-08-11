import { prisma } from "@/lib/prisma.js";
import { ApiError } from "@/lib/ApiError.js";

const profileSelect = {
  id: true,
  name: true,
  age: true,
  sex: true,
  city: true,
  place: true,
  bio: true,
  interests: true,
  photos: { orderBy: { order: "asc" as const } },
};

function toPublicProfile<T extends { interests: string | null }>(user: T) {
  return { ...user, interests: user.interests ? user.interests.split(",").filter(Boolean) : [] };
}

export async function listDiscoverableProfiles(userId: number) {
  const swiped = await prisma.swipe.findMany({ where: { swiperId: userId }, select: { swipedId: true } });
  const excludeIds = [userId, ...swiped.map((s) => s.swipedId)];

  const profiles = await prisma.user.findMany({
    where: { id: { notIn: excludeIds } },
    select: profileSelect,
    take: 30,
  });

  return profiles.map(toPublicProfile);
}

export async function swipe(userId: number, targetId: number, liked: boolean) {
  if (userId === targetId) {
    throw ApiError.badRequest("Você não pode dar swipe no seu próprio perfil");
  }

  const target = await prisma.user.findUnique({ where: { id: targetId } });
  if (!target) throw ApiError.notFound("Perfil não encontrado");

  await prisma.swipe.upsert({
    where: { swiperId_swipedId: { swiperId: userId, swipedId: targetId } },
    update: { liked },
    create: { swiperId: userId, swipedId: targetId, liked },
  });

  if (!liked) {
    return { matched: false };
  }

  const [userAId, userBId] = [userId, targetId].sort((a, b) => a - b);
  const match = await prisma.match.upsert({
    where: { userAId_userBId: { userAId, userBId } },
    update: {},
    create: { userAId, userBId },
  });

  return { matched: true, match };
}

export async function listMatches(userId: number) {
  const matches = await prisma.match.findMany({
    where: { OR: [{ userAId: userId }, { userBId: userId }] },
    include: {
      userA: { select: profileSelect },
      userB: { select: profileSelect },
    },
    orderBy: { createdAt: "desc" },
  });

  return matches.map((match) => {
    const other = match.userAId === userId ? match.userB : match.userA;
    return { matchId: match.id, createdAt: match.createdAt, profile: toPublicProfile(other) };
  });
}
