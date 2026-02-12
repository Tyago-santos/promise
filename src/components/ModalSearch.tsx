import { useModalSearchSore } from "@/store/useModalSeachStore";

export default function ModalSearch() {
  const posts = useModalSearchSore((state) => state.posts);

  return (
    <div className="fixed  right-5 overflow-scroll  left-5 bg-white top-14 rounded-md bottom-20 z-10000">
      {posts.map((perfil) => (
        <button
          key={perfil.id}
          className=" flex w-full items-center border-gray-200 border-b gap-2 p-4"
        >
          <img
            className="size-14 rounded-full object-cover"
            src={perfil.imagens}
            alt="Foto de perfil"
          />
          <span className="text-text">{perfil.nomeUsuario}</span>
        </button>
      ))}
    </div>
  );
}
