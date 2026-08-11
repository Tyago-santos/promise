import { Router } from "express";
import { requireAuth } from "@/middlewares/auth.middleware.js";
import { upload } from "@/middlewares/upload.middleware.js";
import {
  addPhotoHandler,
  getMyProfileHandler,
  getProfileByIdHandler,
  removePhotoHandler,
  updateCoverHandler,
  updateProfileHandler,
} from "@/features/profile/profile.controller.js";

export const profileRoutes = Router();

profileRoutes.use(requireAuth);

profileRoutes.get("/me", getMyProfileHandler);
profileRoutes.patch("/me", updateProfileHandler);
profileRoutes.patch("/me/cover", upload.single("cover"), updateCoverHandler);
profileRoutes.post("/me/photos", upload.single("photo"), addPhotoHandler);
profileRoutes.delete("/me/photos/:photoId", removePhotoHandler);
profileRoutes.get("/:id", getProfileByIdHandler);
