import { Heart, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";

interface UserProfile {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  distance: number;
  interests: string[];
  photos: string[];
  lastActive: string;
  compatibility: number;
}

type SetSearchStatusType = "idle" | "searching" | "found";

type PropsType = {
  searchStatus: SetSearchStatusType;
  allProfiles: UserProfile[];
  setIsSearching: Dispatch<SetStateAction<boolean>>;
};

export default function ModalMatch({
  allProfiles,
  setIsSearching,
  searchStatus,
}: PropsType) {
  const navigate = useNavigate({ from: "/match" });
  return (
    <div
      className="h-[100dvh] bg-gradient-to-b from-primary to-secondary p-4 
    flex flex-col"
    >
      {/* Modal de Match */}
      {searchStatus === "found" && (
        <div
          className="fixed h-screen inset-0 bg-black/70 flex items-center 
        justify-center z-50 p-4"
        >
          <div
            className="bg-gradient-to-br from-pink-500 to-red-500 
          rounded-2xl p-8 max-w-md w-full text-center text-white    
          animate-pulse "
          >
            <div className="flex  flex-1 items-center justify-center gap-4">
              <div className="text-white  text-center  ">
                <Link
                  to="/perfil"
                  replace
                  className=" bg-gradient-to-r rounded-full block p-1 
                  shadow-sm from from-[#7CC3E1] to-[#EB9A96] "
                >
                  <img
                    className="h-20 w-20 rounded-full object-cover"
                    src={allProfiles[1].photos[0]}
                    alt="foto do perfil"
                  />
                </Link>

                {allProfiles[1].name}
              </div>

              <div
                className="w-12 h-12 mx-auto mb-6 bg-white rounded-full flex 
            items-center justify-center"
              >
                <Heart className="w-6 h-6 text-pink-500 animate-tinder " />
              </div>

              <div className=" text-white text-center ">
                <Link
                  to="/perfil"
                  replace
                  className="bg-gradient-to-r block rounded-full p-1 shadow-sm 
                  from from-[#F6C89F] to-[#8B82B5]"
                >
                  <img
                    className="h-20 w-20 rounded-full object-cover"
                    src={allProfiles[2].photos[0]}
                    alt="foto do perfil"
                  />
                </Link>
                {allProfiles[2].name}
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Encontrei seu Match!</h2>
            <p className="text-xl mb-6"></p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsSearching(false)}
                className="bg-white/30 backdrop-blur-md text-white font-semibold 
                py-3 px-6 rounded-full hover:bg-white/40 transition"
              >
                Continuar
              </button>
              <button
                onClick={() =>
                  navigate({
                    to: "/contact/$chat",
                    params: { chat: String(2) },
                  })
                }
                className="bg-white text-pink-600 font-semibold py-3 px-6 
              rounded-full hover:bg-gray-100 transition flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Conversar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tela de "buscando..." */}
      {searchStatus === "searching" && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative mb-8">
            <div
              className="w-32 h-32 border-4 border-white/20 border-t-white 
            rounded-full animate-spin"
            ></div>
            <Heart
              className="w-16 h-16 text-white absolute top-1/2 left-1/2 
            transform -translate-x-1/2 -translate-y-1/2 animate-pulse animate-tinder"
            />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Procurando matches...
          </h3>
          <p className="text-white/70 text-center max-w-md">
            Estamos procurando pessoas que combinam com suas preferências
          </p>
        </div>
      )}
    </div>
  );
}
