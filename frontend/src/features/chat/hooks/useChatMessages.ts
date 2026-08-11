import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages, sendMessage as sendMessageApi, type ChatMessage } from "@/features/chat/api/contacts";
import { contactsQueryKey } from "@/features/chat/query/useContactsQuery";
import { useMyProfileQuery } from "@/features/profile/query/useMyProfileQuery";
import { getChatSocket } from "@/features/chat/lib/socket";

export function messagesQueryKey(matchId: number) {
  return ["chat", "messages", matchId] as const;
}

export function useChatMessages(matchId: number | undefined) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const queryClient = useQueryClient();
  const { data: myProfile } = useMyProfileQuery();

  const { data: rawMessages = [] } = useQuery({
    queryKey: matchId !== undefined ? messagesQueryKey(matchId) : ["chat", "messages", "none"],
    queryFn: () => getMessages(matchId as number),
    enabled: matchId !== undefined,
  });

  useEffect(() => {
    if (matchId === undefined) return;
    const socket = getChatSocket();
    if (!socket) return;

    const handleNewMessage = (message: ChatMessage) => {
      if (message.matchId !== matchId) return;
      queryClient.setQueryData<ChatMessage[]>(messagesQueryKey(matchId), (old) =>
        old?.some((m) => m.id === message.id) ? old : [...(old ?? []), message],
      );
      queryClient.invalidateQueries({ queryKey: contactsQueryKey });
    };

    socket.on("message:new", handleNewMessage);
    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [matchId, queryClient]);

  const sendMutation = useMutation({
    mutationFn: (text: string) => sendMessageApi(matchId as number, text),
    onSuccess: (message) => {
      queryClient.setQueryData<ChatMessage[]>(messagesQueryKey(matchId as number), (old) => [
        ...(old ?? []),
        message,
      ]);
      queryClient.invalidateQueries({ queryKey: contactsQueryKey });
    },
  });

  function sendMessage() {
    if (!inputValue.trim() || matchId === undefined) return;
    sendMutation.mutate(inputValue.trim());
    setInputValue("");
  }

  useEffect(() => {
    bottomRef.current?.scrollTo({
      behavior: "smooth",
      top: bottomRef.current?.scrollHeight,
    });
  }, [rawMessages]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const messages = rawMessages.map((message) => ({
    id: String(message.id),
    text: message.text,
    position: (myProfile && message.senderId === myProfile.id ? "right" : "left") as "left" | "right",
    date: new Date(message.createdAt),
  }));

  return {
    bottomRef,
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    handleKeyPress,
  };
}
