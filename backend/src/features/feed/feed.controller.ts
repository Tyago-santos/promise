import type { Request, Response } from "express";
import { asyncHandler } from "@/lib/asyncHandler.js";
import { ApiError } from "@/lib/ApiError.js";
import { createCommentSchema, createPostSchema } from "@/features/feed/feed.schema.js";
import * as feedService from "@/features/feed/feed.service.js";

function requireUserId(req: Request): number {
  if (!req.userId) throw ApiError.unauthorized();
  return req.userId;
}

function parsePostId(req: Request): number {
  const postId = Number(req.params.postId);
  if (Number.isNaN(postId)) throw ApiError.badRequest("Id de post inválido");
  return postId;
}

export const listPostsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUserId(req);
  const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;
  const posts = await feedService.listPosts(userId, cursor);
  res.json(posts);
});

export const createPostHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUserId(req);
  const input = createPostSchema.parse(req.body);
  const post = await feedService.createPost(userId, input);
  res.status(201).json(post);
});

export const toggleLikeHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUserId(req);
  const postId = parsePostId(req);
  const result = await feedService.toggleLike(userId, postId);
  res.json(result);
});

export const addCommentHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUserId(req);
  const postId = parsePostId(req);
  const input = createCommentSchema.parse(req.body);
  const comment = await feedService.addComment(userId, postId, input);
  res.status(201).json(comment);
});

export const deletePostHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUserId(req);
  const postId = parsePostId(req);
  await feedService.deletePost(userId, postId);
  res.status(204).send();
});
