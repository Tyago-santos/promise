import { Router } from "express";
import { authRoutes } from "@/features/auth/auth.routes.js";
import { profileRoutes } from "@/features/profile/profile.routes.js";
import { feedRoutes } from "@/features/feed/feed.routes.js";
import { matchRoutes } from "@/features/match/match.routes.js";
import { chatRoutes } from "@/features/chat/chat.routes.js";
import { uploadsRoutes } from "@/features/uploads/uploads.routes.js";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/profiles", profileRoutes);
routes.use("/feed", feedRoutes);
routes.use("/matches", matchRoutes);
routes.use("/chat", chatRoutes);
routes.use("/uploads", uploadsRoutes);
