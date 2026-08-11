import { Link, useRouterState } from "@tanstack/react-router";

import HeaderNav from "@/shared/components/layout/HeaderNav";
import ProfileSearchModal from "@/features/profile/components/ProfileSearchModal";

import {
  Menu,
  Search,
  MessageCircle,
  User,
  Home,
  Globe,
  X,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

import { useMyProfileQuery } from "@/features/profile/query/useMyProfileQuery";
import { useSearchProfilesQuery } from "@/features/profile/query/useSearchProfilesQuery";
import { useContactsQuery } from "@/features/chat/query/useContactsQuery";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const debouncedQuery = useDebouncedValue(query, 300);
  const { data: searchResults, isFetching: isSearching } = useSearchProfilesQuery(debouncedQuery);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  type NavPath = "/" | "/match" | "/contact" | "/perfil";

  const { data: contacts } = useContactsQuery();
  const unreadCount = contacts.reduce((total, entry) => total + entry.unreadCount, 0);

  const navItems: {
    id: string;
    label: string;
    icon: ReactNode;
    path: NavPath;
    badge?: number;
  }[] = [
    { id: "home", label: "Início", icon: <Home size={20} />, path: "/" },
    { id: "match", label: "Match", icon: <Globe size={20} />, path: "/match" },
    {
      id: "chat",
      label: "Chat",
      icon: <MessageCircle size={20} />,
      path: "/contact",
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      id: "profile",
      label: "Perfil",
      icon: <User size={20} />,
      path: "/perfil",
    },
  ];

  const { data: profile } = useMyProfileQuery();
  const img = profile?.photos[0]?.url;

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setIsSearchOpen(Boolean(value.trim()));
  };

  const handleClearSearch = () => {
    setQuery("");
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 right-0 left-0 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 z-10000">
        <div className="md:max-w-3xl lg:max-w-5xl md:mx-auto px-4  z-45">
          <nav className="flex items-center justify-between h-20 gap-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative size-10 flex items-center justify-center  ">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-10
                group-hover:opacity-25 transition-opacity duration-300"
                ></div>

                <img
                  className="block w-5 h-5 transform scale-[2.9]
                   transition-transform duration-300 group-hover:scale-[3.1]"
                  src="/logo.png"
                  alt="Logo"
                />
              </div>
              <span className="hidden lg:block text-lg font-bold font-display bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Promise
              </span>
            </Link>

            {/* Nav (ícones das rotas principais) */}
            <HeaderNav />

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-40 md:w-44 lg:w-64 group/search">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-pink-500 transition-colors pointer-events-none"
                  size={17}
                />
                <input
                  value={query}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => query.trim() && setIsSearchOpen(true)}
                  type="text"
                  placeholder="Buscar pessoas..."
                  className="w-full pl-10 pr-9 py-2.5 bg-gray-100 rounded-full text-sm border border-transparent
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-200
                  focus:bg-white focus:shadow-sm"
                />
                {query && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Limpar busca"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              {/* Notificatio */}
              {/* <button className="relative p-2 rounded-full hover:bg-gray-50 transition-colors duration-300 group">
                <Bell
                  size={20}
                  className="text-gray-600 group-hover:text-pink-500 transition-colors"
                />
                <span className="absolute -top-0.5 -right-0.5 size-4 bg-red-500 border-2 border-white rounded-full"></span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Notificações
                </span>
              </button> */}
              {/* Settings */}
              {/* <button className="hidden sm:flex p-2 rounded-full hover:bg-gray-50 transition-colors duration-300 group relative">
                <Settings
                  size={20}
                  className="text-gray-600 group-hover:text-purple-500 transition-colors"
                />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Configurações
                </span>
              </button> */}
              {/* User Profile */}
              <Link to="/perfil" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="size-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100 group-hover:ring-pink-300 transition-all duration-300">
                    {img ? (
                      <img
                        src={img}
                        alt="Perfil"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-accent" />
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
              </Link>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-gray-50 transition-colors duration-300"
                aria-label="Menu"
              >
                <Menu className="text-gray-700" size={24} />
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Search Bar (Hidden on Desktop) */}
        <div className="hidden border-t border-gray-100 px-4 py-3 bg-white">
          <div className="relative max-w-md mx-auto">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar pessoas, posts, hashtags..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:bg-white"
            />
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <ProfileSearchModal profiles={searchResults} isLoading={isSearching} onSelect={handleClearSearch} />
      )}

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 z-40 bg-white border-b border-gray-100 shadow-lg animate-slideDown">
          <div className="container mx-auto px-4 pt-5 pb-3">
            <div className="grid grid-cols-3 gap-3">
              {navItems.map((item) => {
                const isActive =
                  item.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-pink-50 to-purple-50 text-pink-600 border border-pink-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="relative">
                      <div
                        className={`p-2 rounded-full ${isActive ? "bg-white" : "bg-gray-50"}`}
                      >
                        {item.icon}
                      </div>
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 size-5 bg-gradient-to-br from-pink-500 to-purple-500 text-white text-xs font-semibold rounded-full flex items-center justify-center ring-2 ring-white">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="mt-2 text-sm font-medium">
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              {/* Settings Mobile */}
              {/* <button className="flex flex-col items-center justify-center p-4 rounded-2xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300">
                <div className="p-2 rounded-full bg-gray-50">
                  <Settings size={20} />
                </div>
                <span className="mt-2 text-sm font-medium">Configurações</span>
              </button> */}
            </div>

            {/* Quick Stats */}
            {/* <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">128</div>
                  <div className="text-xs text-gray-500">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">56</div>
                  <div className="text-xs text-gray-500">Seguindo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">24</div>
                  <div className="text-xs text-gray-500">Posts</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed top-20 inset-0 bg-black/20 z-30 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
