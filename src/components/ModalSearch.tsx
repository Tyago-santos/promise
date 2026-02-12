import { posts } from "@/api";

export default function ModalSearch() {
  return (
    <div className="fixed hidden right-5 overflow-scroll  left-5 bg-white top-14 rounded-md bottom-20 z-10000">
      {posts.map((perfil) => (
        <button className=" flex w-full items-center border-b-text border gap-2 p-4">
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
