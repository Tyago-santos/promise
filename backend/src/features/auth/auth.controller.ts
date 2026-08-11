import type { Request, Response } from "express";
import { asyncHandler } from "@/lib/asyncHandler.js";
import { ApiError } from "@/lib/ApiError.js";
import { loginSchema, registerSchema } from "@/features/auth/auth.schema.js";
import * as authService from "@/features/auth/auth.service.js";

export const registerHandler = asyncHandler(async (req: Request, res: Response) => {
  const input = registerSchema.parse(req.body);
  const result = await authService.register(input);
  res.status(201).json(result);
});

export const loginHandler = asyncHandler(async (req: Request, res: Response) => {
  const input = loginSchema.parse(req.body);
  const result = await authService.login(input);
  res.status(200).json(result);
});

export const meHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) throw ApiError.unauthorized();
  const user = await authService.getMe(req.userId);
  res.status(200).json(user);
});
