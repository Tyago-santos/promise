import { FaArrowLeft } from "react-icons/fa";

export default function HeaderPefil() {
  return (
    <header>
      <div className="flex gap-2  items-center p-4">
        <div className="rounded-full border-2 border-text p-2">
          <FaArrowLeft />
        </div>
        <div>
          <h3 className="font-bold font-display">Tiago Santos</h3>
          <span className="text-sm text-text font-sans">10 posts</span>
        </div>
      </div>
    </header>
  );
}
