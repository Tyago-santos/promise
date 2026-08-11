import { Router } from "express";
import { requireAuth } from "@/middlewares/auth.middleware.js";
import {
  getMessagesHandler,
  listContactsHandler,
  sendMessageHandler,
  startConversationHandler,
} from "@/features/chat/chat.controller.js";

export const chatRoutes = Router();

chatRoutes.use(requireAuth);

chatRoutes.get("/contacts", listContactsHandler);
chatRoutes.post("/start/:userId", startConversationHandler);
chatRoutes.get("/:matchId/messages", getMessagesHandler);
chatRoutes.post("/:matchId/messages", sendMessageHandler);
