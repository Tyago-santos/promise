import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Globe, MessageCircle, User } from "lucide-react";
import type { ReactNode } from "react";

type NavPath = "/" | "/match" | "/contact" | "/perfil";

const navItems: {
  id: string;
  label: string;
  icon: ReactNode;
  path: NavPath;
  badge?: number;
}[] = [
  { id: "home", label: "Início", icon: <Home size={22} />, path: "/" },
  { id: "match", label: "Match", icon: <Globe size={22} />, path: "/match" },
  {
    id: "chat",
    label: "Chat",
    icon: <MessageCircle size={22} />,
    path: "/contact",
    badge: 3,
  },
  { id: "profile", label: "Perfil", icon: <User size={22} />, path: "/perfil" },
];

type PropsType = {
  light?: boolean;
};

export default function HeaderNav({ light = false }: PropsType) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => {
        const isActive =
          item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);

        return (
          <Link
            key={item.id}
            to={item.path}
            title={item.label}
            aria-label={item.label}
            className={`relative flex items-center gap-2 px-3 lg:px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              isActive
                ? light
                  ? "bg-white/20 text-white"
                  : "bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600"
                : light
                  ? "text-white/80 hover:bg-white/10 hover:text-white"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <div className="relative shrink-0">
              <div
                className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`}
              >
                {item.icon}
              </div>

              {item.badge && (
                <span className="absolute -top-1.5 -right-1.5 size-4 bg-gradient-to-br from-pink-500 to-purple-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center ring-2 ring-white">
                  {item.badge}
                </span>
              )}
            </div>

            <span className="hidden lg:inline whitespace-nowrap">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
