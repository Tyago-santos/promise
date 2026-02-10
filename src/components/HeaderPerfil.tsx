import { useRouter } from "@tanstack/react-router";
import { FaArrowLeft } from "react-icons/fa";

type PropsType = {
  name: string;
};

export default function HeaderPerfil({ name }: PropsType) {
  const router = useRouter();

  return (
    <header className="border border-gray-200">
      <div className="flex gap-2  items-center p-4">
        <div
          onClick={() => router.history.back()}
          className="rounded-full border-2 border-gray-500 text-gray-500  p-2"
        >
          <FaArrowLeft />
        </div>
        <div>
          <h3 className="font-bold font-display text-text">{name}</h3>
          <span className="text-sm text-text font-sans"></span>
        </div>
      </div>
    </header>
  );
}
