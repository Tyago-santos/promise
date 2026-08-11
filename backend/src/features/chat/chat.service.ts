import { prisma } from "@/lib/prisma.js";
import { ApiError } from "@/lib/ApiError.js";

const contactSelect = {
  id: true,
  name: true,
  email: true,
  photos: { select: { url: true }, orderBy: { order: "asc" as const }, take: 1 },
};

async function getMatchForUser(matchId: number, userId: number) {
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: { userA: true, userB: true },
  });

  if (!match) throw ApiError.notFound("Conversa não encontrada");
  if (match.userAId !== userId && match.userBId !== userId) {
    throw ApiError.forbidden("Você não participa desta conversa");
  }

  return match;
}

export async function listContacts(userId: number) {
  const matches = await prisma.match.findMany({
    where: { OR: [{ userAId: userId }, { userBId: userId }] },
    include: {
      userA: { select: contactSelect },
      userB: { select: contactSelect },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  const contacts = await Promise.all(
    matches.map(async (match) => {
      const other = match.userAId === userId ? match.userB : match.userA;
      const unreadCount = await prisma.message.count({
        where: { matchId: match.id, read: false, senderId: { not: userId } },
      });

      return {
        matchId: match.id,
        contact: other,
        lastMessage: match.messages[0] ?? null,
        unreadCount,
      };
    }),
  );

  return contacts;
}

export async function startConversation(userId: number, targetId: number) {
  if (userId === targetId) {
    throw ApiError.badRequest("Você não pode iniciar uma conversa consigo mesmo");
  }

  const target = await prisma.user.findUnique({ where: { id: targetId } });
  if (!target) throw ApiError.notFound("Usuário não encontrado");

  const [userAId, userBId] = [userId, targetId].sort((a, b) => a - b);
  const match = await prisma.match.upsert({
    where: { userAId_userBId: { userAId, userBId } },
    update: {},
    create: { userAId, userBId },
  });

  return { matchId: match.id };
}

export async function getMessages(userId: number, matchId: number) {
  await getMatchForUser(matchId, userId);

  const messages = await prisma.message.findMany({
    where: { matchId },
    orderBy: { createdAt: "asc" },
  });

  await prisma.message.updateMany({
    where: { matchId, senderId: { not: userId }, read: false },
    data: { read: true },
  });

  return messages;
}

export async function sendMessage(userId: number, matchId: number, text: string) {
  const match = await getMatchForUser(matchId, userId);

  const message = await prisma.message.create({
    data: { matchId, senderId: userId, text },
  });

  const recipientId = match.userAId === userId ? match.userBId : match.userAId;
  return { message, recipientId };
}
