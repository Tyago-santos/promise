import type { PostType } from "@/features/feed/api/posts";
import type { Profile } from "@/features/profile/api/profile";
import PostContent from "@/features/feed/components/PostContent";
import { LocateIcon, LogOut } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { logout } from "@/features/auth";
import { disconnectChatSocket } from "@/features/chat/lib/socket";

type PropsType = {
  posts: PostType[];
  profile: Profile;
};

export default function InforPerfilPrivate({ posts, profile }: PropsType) {
  const navigate = useNavigate();

  const handleLogout = () => {
    disconnectChatSocket();
    logout();
    navigate({ to: "/login", replace: true });
  };

  return (
    <div>
      <div className="w-full h-56 md:h-80 relative overflow-hidden bg-gradient-to-br from-primary/40 to-accent/40">
        {profile.coverUrl && (
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={profile.coverUrl}
            alt="Capa do perfil"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
      </div>

      <div className="m-auto max-w-3xl">
      <div className="bg-surface -mt-10 relative z-10 rounded-3xl shadow-sm pt-4 pb-3 px-5">
        <div className="flex justify-between items-end">
          <div
            className="h-24 w-24 -mt-16 rounded-full
        overflow-hidden flex items-center justify-center border-4 border-surface shadow-md bg-gray-100"
          >
            {profile.photos[0]?.url ? (
              <img
                className="max-w-full max-h-full    scale-[1.5] "
                src={profile.photos[0].url}
                alt="imagem de perfil"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Sair"
              className="flex items-center gap-1.5 text-gray-600 shadow-sm hover:shadow-md hover:bg-gray-50
                     bg-white border border-gray-200 px-4 md:px-6 text-xs md:text-sm font-semibold py-2.5
                     rounded-full transition-all cursor-pointer"
            >
              <LogOut size={14} />
              Sair
            </button>

            <Link
              to="/perfil/edit_perfil"
              className="text-white shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.97]
                     bg-gradient-to-r from-pink-500 to-purple-500 px-4 md:px-8 text-xs md:text-sm font-semibold py-2.5
                     rounded-full transition-all"
            >
              Editar perfil
            </Link>
          </div>
        </div>

        <div>
          <div className="mt-3">
            <span className="font-bold text-xl block font-display text-gray-900">
              {profile.name}
              {profile.age ? (
                <span className="font-semibold text-base font-sans text-gray-400">
                  {" "}
                  · {profile.age} anos
                </span>
              ) : null}
            </span>
          </div>

          {profile.bio && (
            <p className="my-2 text-gray-600 leading-relaxed">{profile.bio}</p>
          )}

          {(profile.place || profile.city) && (
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <LocateIcon size={16} className="text-accent" />
              {[profile.place, profile.city].filter(Boolean).join(" - ")}
            </div>
          )}

          {profile.interests.length > 0 && (
            <div className="flex gap-2 flex-wrap my-3">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="text-xs font-semibold font-display px-3 py-1 rounded-full bg-accent/10 text-accent"
                >
                  #{interest}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="pt-4">
        <PostContent posts={posts} />
      </div>
      </div>
    </div>
  );
}
