import type { Request, Response } from "express";
import { asyncHandler } from "@/lib/asyncHandler.js";
import { ApiError } from "@/lib/ApiError.js";
import { uploadImage } from "@/lib/storage.js";
import { updateProfileSchema } from "@/features/profile/profile.schema.js";
import * as profileService from "@/features/profile/profile.service.js";

export const getMyProfileHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) throw ApiError.unauthorized();
  const profile = await profileService.getProfileById(req.userId);
  res.json(profile);
});

export const getProfileByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) throw ApiError.badRequest("Id inválido");
  const profile = await profileService.getProfileById(id);
  res.json(profile);
});

export const updateProfileHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) throw ApiError.unauthorized();
  const input = updateProfileSchema.parse(req.body);
  const profile = await profileService.updateProfile(req.userId, input);
  res.json(profile);
});

export const updateCoverHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) throw ApiError.unauthorized();
  if (!req.file) throw ApiError.badRequest("Nenhuma imagem enviada");

  const url = await uploadImage(req.file);
  const profile = await profileService.updateCover(req.userId, url);
  res.json(profile);
});

export const addPhotoHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) throw ApiError.unauthorized();
  if (!req.file) throw ApiError.badRequest("Nenhuma imagem enviada");

  const url = await uploadImage(req.file);
  const photo = await profileService.addPhoto(req.userId, url);
  res.status(201).json(photo);
});

export const removePhotoHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) throw ApiError.unauthorized();
  const photoId = Number(req.params.photoId);
  if (Number.isNaN(photoId)) throw ApiError.badRequest("Id inválido");

  await profileService.removePhoto(req.userId, photoId);
  res.status(204).send();
});
