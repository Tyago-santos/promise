import { Link } from "@tanstack/react-router";
import {
  Menu,
  Search,
  MessageCircle,
  User,
  Home,
  Globe,
  Settings,
} from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const navItems = [
    { id: "home", label: "Início", icon: <Home size={20} />, path: "/" },
    { id: "match", label: "Match", icon: <Globe size={20} />, path: "/match" },
    {
      id: "chat",
      label: "Chat",
      icon: <MessageCircle size={20} />,
      path: "/contact",
      badge: 3,
    },
    {
      id: "search",
      label: "Buscar",
      icon: <Search size={20} />,
      path: "/search",
    },
    {
      id: "profile",
      label: "Perfil",
      icon: <User size={20} />,
      path: "/perfil",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              onClick={() => setActiveLink("home")}
            >
              <div className="relative size-10 flex items-center justify-center">
                <div className="absolute inset-0  rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <img
                  className="block w-8 h-8 transform scale-[2.9] group-hover:scale-110 transition-transform duration-300"
                  src="/logo_transparent.png"
                  alt="Logo"
                />
              </div>
              {/* <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Conecta+
              </span> */}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeLink === item.id
                      ? "bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveLink(item.id)}
                >
                  <div
                    className={`transition-transform duration-300 ${
                      activeLink === item.id ? "scale-110" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>

                  {/* Notification Badge */}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 size-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}

                  {/* Active Indicator */}
                  {activeLink === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Bar (Mobile/Tablet) */}
              <div className="md:hidden relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:bg-white w-40"
                />
              </div>

              {/* Notifications */}
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
              <button className="hidden sm:flex p-2 rounded-full hover:bg-gray-50 transition-colors duration-300 group relative">
                <Settings
                  size={20}
                  className="text-gray-600 group-hover:text-purple-500 transition-colors"
                />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Configurações
                </span>
              </button>

              {/* User Profile */}
              <Link
                to="/perfil"
                className="flex items-center gap-2 group"
                onClick={() => setActiveLink("profile")}
              >
                <div className="relative">
                  <div className="size-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-pink-500 transition-all duration-300">
                    <img
                      src="/image_perfil.png"
                      alt="Perfil"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 border-2 border-white rounded-full"></div>
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
        {/* <div className="md:hidden border-t border-gray-100 px-4 py-3 bg-white">
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
        </div> */}
      </header>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-40 bg-white border-b border-gray-100 shadow-lg animate-slideDown">
          <div className="container mx-auto px-4 py-3">
            <div className="grid grid-cols-3 gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 ${
                    activeLink === item.id
                      ? "bg-gradient-to-br from-pink-50 to-purple-50 text-pink-600 border border-pink-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveLink(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="relative">
                    <div
                      className={`p-2 rounded-full ${activeLink === item.id ? "bg-white" : "bg-gray-50"}`}
                    >
                      {item.icon}
                    </div>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 size-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="mt-2 text-sm font-medium">{item.label}</span>
                </Link>
              ))}

              {/* Settings Mobile */}
              <button className="flex flex-col items-center justify-center p-4 rounded-2xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300">
                <div className="p-2 rounded-full bg-gray-50">
                  <Settings size={20} />
                </div>
                <span className="mt-2 text-sm font-medium">Configurações</span>
              </button>
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
          className="md:hidden fixed inset-0 bg-black/20 z-30 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
