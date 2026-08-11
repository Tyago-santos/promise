import type { Request, Response } from "express";
import { asyncHandler } from "@/lib/asyncHandler.js";
import { ApiError } from "@/lib/ApiError.js";
import { swipeSchema } from "@/features/match/match.schema.js";
import * as matchService from "@/features/match/match.service.js";

export const listDiscoverableHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) throw ApiError.unauthorized();
  const profiles = await matchService.listDiscoverableProfiles(req.userId);
  res.json(profiles);
});

export const swipeHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) throw ApiError.unauthorized();
  const { targetId, liked } = swipeSchema.parse(req.body);
  const result = await matchService.swipe(req.userId, targetId, liked);
  res.json(result);
});

export const listMatchesHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) throw ApiError.unauthorized();
  const matches = await matchService.listMatches(req.userId);
  res.json(matches);
});
