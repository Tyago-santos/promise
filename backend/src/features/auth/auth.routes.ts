import { Router } from "express";
import { requireAuth } from "@/middlewares/auth.middleware.js";
import { loginHandler, meHandler, registerHandler } from "@/features/auth/auth.controller.js";

export const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/me", requireAuth, meHandler);
