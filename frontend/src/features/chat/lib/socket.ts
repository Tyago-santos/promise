import { io, type Socket } from "socket.io-client";
import { getToken } from "@/shared/lib/httpClient";

const SOCKET_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

let socket: Socket | null = null;

export function getChatSocket(): Socket | null {
  const token = getToken();
  if (!token) return null;

  if (!socket) {
    socket = io(SOCKET_URL, { auth: { token } });
  } else if (!socket.connected) {
    socket.auth = { token };
    socket.connect();
  }

  return socket;
}

export function disconnectChatSocket(): void {
  socket?.disconnect();
  socket = null;
}
