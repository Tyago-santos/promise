import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma.js";
import { ApiError } from "@/lib/ApiError.js";
import type { CreateCommentInput, CreatePostInput } from "@/features/feed/feed.schema.js";

const authorSelect = {
  id: true,
  name: true,
  email: true,
  photos: { select: { url: true }, orderBy: { order: "asc" as const }, take: 1 },
};

const postInclude = Prisma.validator<Prisma.PostInclude>()({
  author: { select: authorSelect },
  comments: { include: { author: { select: authorSelect } }, orderBy: { createdAt: "asc" } },
  likes: { select: { userId: true } },
});

type PostWithRelations = Prisma.PostGetPayload<{ include: typeof postInclude }>;

function serializePost(post: PostWithRelations, viewerId: number) {
  const { likes, ...rest } = post;
  return {
    ...rest,
    likesCount: likes.length,
    likedByMe: likes.some((like) => like.userId === viewerId),
  };
}

export async function listPosts(viewerId: number, cursor?: number) {
  const posts = await prisma.post.findMany({
    take: 20,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    orderBy: { createdAt: "desc" },
    include: postInclude,
  });

  return posts.map((post) => serializePost(post, viewerId));
}

export async function createPost(authorId: number, input: CreatePostInput) {
  const post = await prisma.post.create({
    data: { authorId, description: input.description, imageUrl: input.imageUrl },
    include: postInclude,
  });

  return serializePost(post, authorId);
}

export async function toggleLike(userId: number, postId: number) {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw ApiError.notFound("Post não encontrado");

  const existingLike = await prisma.like.findUnique({
    where: { postId_userId: { postId, userId } },
  });

  if (existingLike) {
    await prisma.like.delete({ where: { id: existingLike.id } });
    return { liked: false };
  }

  await prisma.like.create({ data: { postId, userId } });
  return { liked: true };
}

export async function addComment(userId: number, postId: number, input: CreateCommentInput) {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw ApiError.notFound("Post não encontrado");

  return prisma.comment.create({
    data: { postId, authorId: userId, text: input.text },
    include: { author: { select: authorSelect } },
  });
}

export async function deletePost(userId: number, postId: number) {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw ApiError.notFound("Post não encontrado");
  if (post.authorId !== userId) throw ApiError.forbidden("Você não pode excluir este post");

  await prisma.post.delete({ where: { id: postId } });
}
