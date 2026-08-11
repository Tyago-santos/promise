import { useRouter } from "@tanstack/react-router";
import { FaArrowLeft } from "react-icons/fa";
import HeaderNav from "./HeaderNav";

type PropsType = {
  name?: string;
  match?: boolean;
  hideSidebar?: boolean;
};

export default function HeaderPerfil({
  name,
  match = false,
  hideSidebar = false,
}: PropsType) {
  const router = useRouter();

  return (
    <header
      className={
        !match
          ? `p-4 sticky top-0 z-30 bg-surface/90 backdrop-blur-sm border-b border-gray-100`
          : `border border-transparent`
      }
    >
      <div className="flex gap-3 items-center justify-between">
        <div className="flex gap-3 items-center min-w-0">
          <button
            onClick={() => router.history.back()}
            aria-label="Voltar"
            className={
              !match
                ? `md:hidden rounded-full border border-gray-200 text-gray-500 p-2.5 hover:bg-gray-50 hover:text-gray-800 transition-colors cursor-pointer shrink-0`
                : `md:hidden rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white p-2.5 transition-colors cursor-pointer shrink-0`
            }
          >
            <FaArrowLeft size={14} />
          </button>
          {name && (
            <div className="min-w-0">
              <h3
                className={
                  !match
                    ? `font-bold font-display text-gray-900 truncate`
                    : `font-bold font-display text-white truncate`
                }
              >
                {name}
              </h3>
            </div>
          )}
        </div>

        {!match && !hideSidebar && <HeaderNav />}
      </div>
    </header>
  );
}
