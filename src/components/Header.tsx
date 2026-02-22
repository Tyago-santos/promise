import { Link } from "@tanstack/react-router";

import { useModalSearchSore } from "@/store/useModalSeachStore";

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

type InputType = {
  search: string;
};

import { useForm, type SubmitHandler } from "react-hook-form";
import { posts } from "@/api";
import { userStore } from "@/store/userStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clearInput, setClearInput] = useState(false);

  const { register, handleSubmit, reset } = useForm<InputType>();

  const addModal = useModalSearchSore((state) => state.addModal);
  const removeModal = useModalSearchSore((state) => state.removeModal);
  const getPosts = useModalSearchSore((state) => state.getPosts);

  const [activeLink, setActiveLink] = useState("home");
  const media = window.matchMedia("(max-width: 768px)");
  type NavPath = "/" | "/match" | "/contact" | "/perfil";

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
      badge: 3,
    },
    {
      id: "profile",
      label: "Perfil",
      icon: <User size={20} />,
      path: "/perfil",
    },
  ];

  // const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value == "") {
  //     toggleModal(false);
  //   }
  // };

  const img = userStore((state) => state.image_perfil);

  const handleFomInput: SubmitHandler<InputType> = (data) => {
    if (data.search) {
      const filterPost = posts.filter((post) =>
        post.nomeUsuario
          .toLocaleLowerCase()
          .includes(data.search.toLocaleLowerCase()),
      );
      getPosts(filterPost);
    }
  };

  return (
    <>
      <header className="fixed top-o right-0 left-0 bg-white z-10000">
        <div className="md:max-w-3xl md:mx-auto px-4  z-45">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              onClick={() => setActiveLink("home")}
            >
              <div className="relative size-10 flex items-center justify-center  ">
                <div
                  className="absolute inset-0  rounded-full opacity-10 
                group-hover:opacity-20 transition-opacity duration-300"
                ></div>

                <img
                  className="block w-5 h-5 transform scale-[2.9] 
                   transition-transform duration-300"
                  src="/logo.png"
                  alt="Logo"
                />
              </div>
              {/* <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Conecta+
              </span> */}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-col fixed left-10 top-24 gap-10 h-full items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative ${!media.matches && item.id === "search" ? "hidden" : "flex"}  flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeLink === item.id
                      ? "bg-gradient-to-r from-pink-50 to-purple-50 tex t-pink-600"
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
              <form
                onSubmit={handleSubmit(handleFomInput)}
                className="md:w-[600px]  relative "
              >
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  onFocus={(e) => {
                    if (!clearInput) {
                      e.target.value = "";
                    }
                    addModal(true);
                    setClearInput(true);
                  }}
                  {...register("search")}
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 md:w-full pr-4 py-3 bg-gray-50 rounded-full text-sm 
                  focus:outline-none focus:ring-2 focus:ring-pink-500/20 
                  focus:bg-white w-40"
                />
                {clearInput && (
                  <X
                    onClick={() => {
                      removeModal(false);
                      setClearInput(false);
                      reset();
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                )}
              </form>
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
              <Link
                to="/perfil"
                className="flex items-center gap-2 group"
                onClick={() => setActiveLink("profile")}
              >
                <div className="relative">
                  <div className="size-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-pink-500 transition-all duration-300">
                    <img
                      src={img}
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
          className="md:hidden fixed top-16 inset-0 bg-black/20 z-30 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
