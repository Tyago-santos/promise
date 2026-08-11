import { Router } from "express";
import { requireAuth } from "@/middlewares/auth.middleware.js";
import { upload } from "@/middlewares/upload.middleware.js";
import { uploadImageHandler } from "@/features/uploads/uploads.controller.js";

export const uploadsRoutes = Router();

uploadsRoutes.use(requireAuth);

uploadsRoutes.post("/image", upload.single("image"), uploadImageHandler);
