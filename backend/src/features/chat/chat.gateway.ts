import type { Server as HttpServer } from "node:http";
import { Server, type Socket } from "socket.io";
import { env } from "@/config/env.js";
import { verifyToken } from "@/lib/jwt.js";

let io: Server | null = null;

function userRoom(userId: number) {
  return `user:${userId}`;
}

export function initChatGateway(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: { origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()) },
  });

  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token as string | undefined;
    if (!token) {
      next(new Error("Não autenticado"));
      return;
    }

    try {
      const payload = verifyToken(token);
      socket.data.userId = payload.sub;
      next();
    } catch {
      next(new Error("Token inválido"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.data.userId as number;
    socket.join(userRoom(userId));

    socket.on("disconnect", () => {
      socket.leave(userRoom(userId));
    });
  });

  return io;
}

export function emitNewMessage(recipientId: number, message: unknown) {
  io?.to(userRoom(recipientId)).emit("message:new", message);
}
