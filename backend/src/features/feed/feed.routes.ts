import { Router } from "express";
import { requireAuth } from "@/middlewares/auth.middleware.js";
import {
  addCommentHandler,
  createPostHandler,
  deletePostHandler,
  listPostsHandler,
  toggleLikeHandler,
} from "@/features/feed/feed.controller.js";

export const feedRoutes = Router();

feedRoutes.use(requireAuth);

feedRoutes.get("/", listPostsHandler);
feedRoutes.post("/", createPostHandler);
feedRoutes.delete("/:postId", deletePostHandler);
feedRoutes.post("/:postId/like", toggleLikeHandler);
feedRoutes.post("/:postId/comments", addCommentHandler);
