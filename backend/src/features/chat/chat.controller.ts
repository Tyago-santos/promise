import type { Request, Response } from "express";
import { asyncHandler } from "@/lib/asyncHandler.js";
import { ApiError } from "@/lib/ApiError.js";
import { sendMessageSchema } from "@/features/chat/chat.schema.js";
import * as chatService from "@/features/chat/chat.service.js";
import { emitNewMessage } from "@/features/chat/chat.gateway.js";

function requireUserId(req: Request): number {
  if (!req.userId) throw ApiError.unauthorized();
  return req.userId;
}

function parseMatchId(req: Request): number {
  const matchId = Number(req.params.matchId);
  if (Number.isNaN(matchId)) throw ApiError.badRequest("Id de conversa inválido");
  return matchId;
}

export const listContactsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUserId(req);
  const contacts = await chatService.listContacts(userId);
  res.json(contacts);
});

export const startConversationHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUserId(req);
  const targetId = Number(req.params.userId);
  if (Number.isNaN(targetId)) throw ApiError.badRequest("Id de usuário inválido");

  const result = await chatService.startConversation(userId, targetId);
  res.status(200).json(result);
});

export const getMessagesHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUserId(req);
  const matchId = parseMatchId(req);
  const messages = await chatService.getMessages(userId, matchId);
  res.json(messages);
});

export const sendMessageHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUserId(req);
  const matchId = parseMatchId(req);
  const { text } = sendMessageSchema.parse(req.body);

  const { message, recipientId } = await chatService.sendMessage(userId, matchId, text);
  emitNewMessage(recipientId, message);

  res.status(201).json(message);
});
