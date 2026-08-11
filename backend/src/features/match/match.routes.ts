import { Router } from "express";
import { requireAuth } from "@/middlewares/auth.middleware.js";
import { listDiscoverableHandler, listMatchesHandler, swipeHandler } from "@/features/match/match.controller.js";

export const matchRoutes = Router();

matchRoutes.use(requireAuth);

matchRoutes.get("/discover", listDiscoverableHandler);
matchRoutes.post("/swipe", swipeHandler);
matchRoutes.get("/", listMatchesHandler);
