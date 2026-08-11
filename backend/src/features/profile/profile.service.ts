import { prisma } from "@/lib/prisma.js";
import { ApiError } from "@/lib/ApiError.js";
import { removeImage } from "@/lib/storage.js";
import type { UpdateProfileInput } from "@/features/profile/profile.schema.js";

const profileSelect = {
  id: true,
  name: true,
  email: true,
  age: true,
  sex: true,
  city: true,
  place: true,
  bio: true,
  interests: true,
  coverUrl: true,
  createdAt: true,
  photos: { orderBy: { order: "asc" as const } },
};

function toInterestsArray(interests: string | null): string[] {
  return interests ? interests.split(",").filter(Boolean) : [];
}

function serializeProfile<T extends { interests: string | null }>(profile: T) {
  return { ...profile, interests: toInterestsArray(profile.interests) };
}

export async function getProfileById(id: number) {
  const profile = await prisma.user.findUnique({ where: { id }, select: profileSelect });
  if (!profile) throw ApiError.notFound("Perfil não encontrado");
  return serializeProfile(profile);
}

export async function updateProfile(userId: number, input: UpdateProfileInput) {
  const { interests, ...rest } = input;

  const profile = await prisma.user.update({
    where: { id: userId },
    data: {
      ...rest,
      ...(interests ? { interests: interests.join(",") } : {}),
    },
    select: profileSelect,
  });

  return serializeProfile(profile);
}

export async function updateCover(userId: number, url: string) {
  const current = await prisma.user.findUnique({ where: { id: userId }, select: { coverUrl: true } });

  const profile = await prisma.user.update({
    where: { id: userId },
    data: { coverUrl: url },
    select: profileSelect,
  });

  if (current?.coverUrl) await removeImage(current.coverUrl);
  return serializeProfile(profile);
}

export async function addPhoto(userId: number, url: string) {
  const currentCount = await prisma.photo.count({ where: { userId } });
  return prisma.photo.create({ data: { url, userId, order: currentCount } });
}

export async function removePhoto(userId: number, photoId: number) {
  const photo = await prisma.photo.findUnique({ where: { id: photoId } });
  if (!photo || photo.userId !== userId) {
    throw ApiError.notFound("Foto não encontrada");
  }
  await prisma.photo.delete({ where: { id: photoId } });
  await removeImage(photo.url);
}
