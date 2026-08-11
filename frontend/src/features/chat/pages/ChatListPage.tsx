import { useState } from "react";
import { useContactsQuery } from "@/features/chat/query/useContactsQuery";
import ContactMobile from "@/features/chat/components/ContactMobile";
import { Link } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { getOptimizedImageUrl } from "@/shared/lib/imageUrl";
import { useChatMessages } from "@/features/chat/hooks/useChatMessages";

type PropsType = {
  mediaMatches: boolean;
};

export default function ChatListPage({ mediaMatches }: PropsType) {
  const { data: contacts } = useContactsQuery();
  const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>(undefined);

  const activeMatchId = selectedMatchId ?? contacts[0]?.matchId;
  const activeContact = contacts.find((entry) => entry.matchId === activeMatchId);

  const { bottomRef, messages, inputValue, setInputValue, sendMessage, handleKeyPress } =
    useChatMessages(activeContact?.matchId);

  if (mediaMatches) {
    return <ContactMobile media={mediaMatches} />;
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <ContactMobile media={mediaMatches} selectedMatchId={activeMatchId} onSelect={setSelectedMatchId} />

      <div className="flex-1 flex flex-col min-w-0">
        {!activeContact ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Escolha uma conversa para começar
          </div>
        ) : (
          <>
            <div ref={bottomRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${msg.position === `right` ? `justify-end` : `justify-start`}`}
                >
                  {msg.position === "left" && (
                    <Link
                      to="/perfil/$perfil"
                      params={{ perfil: String(activeContact.contact.id) }}
                      className="size-8 rounded-full flex items-center justify-center shrink-0"
                    >
                      <img
                        className="h-full w-full object-cover rounded-full ring-2 ring-white shadow-sm"
                        src={getOptimizedImageUrl(activeContact.contact.photos[0]?.url ?? "/image_perfil.png", 64)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>
                  )}

                  <div
                    className={`max-w-[75%] lg:max-w-[420px] px-4 py-2.5 shadow-sm ${
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

            <div className="p-4 bg-surface/95 backdrop-blur-sm border-t border-gray-100 shrink-0">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-full
                    focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-colors"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim()}
                  aria-label="Enviar mensagem"
                  className="p-3.5 bg-gradient-to-br from-primary to-secondary
                text-white rounded-full shadow-md hover:shadow-lg active:scale-95 disabled:opacity-40 disabled:shadow-none transition-all shrink-0"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
