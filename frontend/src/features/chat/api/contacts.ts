import { apiFetch } from "@/shared/lib/httpClient";

export type ChatMessage = {
  id: number;
  text: string;
  read: boolean;
  createdAt: string;
  matchId: number;
  senderId: number;
};

export type ChatContact = {
  matchId: number;
  contact: {
    id: number;
    name: string;
    email: string;
    photos: { url: string }[];
  };
  lastMessage: ChatMessage | null;
  unreadCount: number;
};

export function listContacts(): Promise<ChatContact[]> {
  return apiFetch<ChatContact[]>("/api/chat/contacts");
}

export function startConversation(userId: number): Promise<{ matchId: number }> {
  return apiFetch<{ matchId: number }>(`/api/chat/start/${userId}`, { method: "POST" });
}

export function getMessages(matchId: number): Promise<ChatMessage[]> {
  return apiFetch<ChatMessage[]>(`/api/chat/${matchId}/messages`);
}

export function sendMessage(matchId: number, text: string): Promise<ChatMessage> {
  return apiFetch<ChatMessage>(`/api/chat/${matchId}/messages`, { method: "POST", body: { text } });
}
