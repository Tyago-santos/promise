import { useRouter } from "@tanstack/react-router";
import { FaArrowLeft } from "react-icons/fa";

type PropsType = {
  name: string;
  match?: boolean;
};

export default function HeaderPerfil({ name, match = false }: PropsType) {
  const router = useRouter();

  return (
    <header
      className={
        !match ? `border border-gray-200 p-4` : `border border-transparent`
      }
    >
      <div className="flex gap-2  items-center ">
        <div
          onClick={() => router.history.back()}
          className={
            !match
              ? `rounded-full border-2 border-gray-500 text-gray-500  p-2`
              : `rounded-full  text-white  p-2`
          }
        >
          <FaArrowLeft />
        </div>
        <div>
          <h3
            className={
              !match
                ? `font-bold font-display text-text `
                : `font-bold font-display text-white`
            }
          >
            {name}
          </h3>
          <span className="text-sm text-text font-sans"></span>
        </div>
      </div>
    </header>
  );
}
