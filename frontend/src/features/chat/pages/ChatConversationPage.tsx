import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useContactsQuery } from "@/features/chat/query/useContactsQuery";

import HeaderPerfil from "@/shared/components/layout/HeaderPerfil";
import { getOptimizedImageUrl } from "@/shared/lib/imageUrl";
import { useChatMessages } from "@/features/chat/hooks/useChatMessages";

type PropsType = {
  chat: string;
};

export default function ChatConversationPage({ chat }: PropsType) {
  const matchId = Number(chat);
  const { data: contacts, isLoading } = useContactsQuery();
  const contact = contacts.find((entry) => entry.matchId === matchId);

  const { bottomRef, messages, inputValue, setInputValue, sendMessage, handleKeyPress } =
    useChatMessages(Number.isFinite(matchId) ? matchId : undefined);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const handler = () => {
      const offset = window.innerHeight - vv.height - vv.offsetTop;
      setKeyboardOffset(offset > 0 ? Math.round(offset) : 0);
    };

    handler();
    vv.addEventListener("resize", handler);
    vv.addEventListener("scroll", handler);
    return () => {
      vv.removeEventListener("resize", handler);
      vv.removeEventListener("scroll", handler);
    };
  }, []);

  if (!contact) {
    return (
      <div className="flex flex-col h-[100dvh] bg-background">
        <HeaderPerfil name="Conversa" hideSidebar />
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          {isLoading ? "Carregando..." : "Conversa não encontrada"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex  flex-col h-[100dvh] bg-background">
      <HeaderPerfil name={contact.contact.name} hideSidebar />

      <div
        ref={bottomRef}
        className="flex-1 overflow-y-auto z-0 p-4 space-y-3"
        style={{ paddingBottom: 96 + keyboardOffset }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.position === `right` ? `justify-end` : `justify-start`}`}
          >
            {msg.position === "left" && (
              <Link
                to="/perfil/$perfil"
                params={{ perfil: String(contact.contact.id) }}
                className="size-8 rounded-full flex items-center justify-center shrink-0"
              >
                <img
                  className="h-full w-full object-cover rounded-full ring-2 ring-white shadow-sm"
                  src={getOptimizedImageUrl(contact.contact.photos[0]?.url ?? "/image_perfil.png", 64)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </Link>
            )}

            <div
              className={`max-w-[75%] sm:max-w-[260px] px-4 py-2.5 shadow-sm ${
                msg.position === "right"
                  ? "bg-gradient-to-br from-secondary to-sky-500 text-white rounded-2xl rounded-br-md"
                  : "bg-surface text-gray-800 border border-gray-100 rounded-2xl rounded-bl-md"
              }`}
            >
              <p className="text-[15px] leading-snug">{msg.text}</p>
              <span
                className={`text-[11px] block text-right mt-1 ${msg.position === "right" ? "text-white/70" : "text-gray-400"}`}
              >
                {msg.date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          bottom: `calc(${keyboardOffset}px + max(0.75rem, env(safe-area-inset-bottom)))`,
        }}
        className="mx-3 z-100 absolute left-0 right-0 transition-[bottom] duration-150 ease-out"
      >
        <div className="flex gap-2 items-center p-2 bg-surface/95 backdrop-blur-sm rounded-full shadow-lg ring-1 ring-black/5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 min-w-0 px-4 py-3 bg-gray-100 rounded-full
                focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white
                transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim()}
            aria-label="Enviar mensagem"
            className="p-3.5 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-md hover:shadow-lg active:scale-95 disabled:opacity-40 disabled:shadow-none transition-all shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
