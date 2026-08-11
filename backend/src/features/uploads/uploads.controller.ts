import type { Request, Response } from "express";
import { asyncHandler } from "@/lib/asyncHandler.js";
import { ApiError } from "@/lib/ApiError.js";
import { uploadImage } from "@/lib/storage.js";

export const uploadImageHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) throw ApiError.badRequest("Nenhuma imagem enviada");
  const url = await uploadImage(req.file);
  res.status(201).json({ url });
});
