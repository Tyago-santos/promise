import HeaderPerfil from "@/shared/components/layout/HeaderPerfil";

import { useContactsQuery } from "@/features/chat/query/useContactsQuery";
import { Link } from "@tanstack/react-router";
import { getOptimizedImageUrl } from "@/shared/lib/imageUrl";
import { formatCommentAge } from "@/features/feed/services/postService";

type PropsType = {
  media: boolean;
  selectedMatchId?: number;
  onSelect?: (matchId: number) => void;
};

export default function ContactMobile({ media, selectedMatchId, onSelect }: PropsType) {
  const { data: contacts } = useContactsQuery();

  return (
    <main
      className={
        !media
          ? `w-100 bg-surface border-r border-gray-100 overflow-y-scroll scrollbar-thin`
          : "w-full bg-background min-h-dvh"
      }
    >
      <HeaderPerfil name="Conversas" hideSidebar />
      <div>
        <h3 className="font-display font-bold px-4 pt-2 pb-3 text-xl">
          Mensagens
        </h3>

        {contacts.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-10 px-4">
            Vocês ainda não têm conversas. Dê um match para começar a conversar!
          </p>
        )}

        <div className="flex flex-col px-2 gap-1 pb-4">
          {contacts.map((entry) => {
            const hasUnread = entry.unreadCount > 0;
            const avatar = entry.contact.photos[0]?.url ?? "/image_perfil.png";
            const lastMessageText = entry.lastMessage?.text ?? "Vocês deram match! Diga oi.";
            const lastMessageTime = entry.lastMessage
              ? formatCommentAge(entry.lastMessage.createdAt)
              : "";

            const content = (
              <>
                <div className="rounded-full size-13 flex items-center justify-center relative shrink-0">
                  <img
                    className="relative z-0 h-full w-full rounded-full object-cover ring-2 ring-white shadow-sm"
                    src={getOptimizedImageUrl(avatar, 104)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-display truncate ${hasUnread ? "font-bold text-gray-900" : "font-semibold text-gray-700"}`}
                    >
                      {entry.contact.name}
                    </span>
                    <span
                      className={`text-xs shrink-0 ${hasUnread ? "text-pink-600 font-semibold" : "text-gray-400"}`}
                    >
                      {lastMessageTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <p
                      className={`font-sans text-sm truncate ${hasUnread ? "text-gray-800" : "text-gray-400"}`}
                    >
                      {lastMessageText}
                    </p>
                    {hasUnread && (
                      <span className="shrink-0 size-5 flex items-center justify-center text-[11px] font-semibold text-white bg-gradient-to-br from-pink-500 to-purple-500 rounded-full">
                        {entry.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </>
            );

            const isSelected = !media && entry.matchId === selectedMatchId;
            const className = `flex items-center hover:bg-gray-50 active:bg-gray-100 p-2 rounded-xl gap-3 transition-colors ${isSelected ? "bg-gray-100" : ""}`;

            if (media) {
              return (
                <Link
                  to="/contact/$chat"
                  key={entry.matchId}
                  params={{ chat: String(entry.matchId) }}
                  className={className}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                type="button"
                key={entry.matchId}
                onClick={() => onSelect?.(entry.matchId)}
                className={`${className} text-left w-full`}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
