import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const AuthPasswordInput = forwardRef<HTMLInputElement, PropsType>(
  ({ error, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="mb-4">
        <div
          className={`flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3.5 transition-colors focus-within:ring-2 focus-within:ring-secondary/30 ${
            error
              ? "border-red-400"
              : "border-gray-200 focus-within:border-secondary"
          }`}
        >
          <Lock size={18} className="shrink-0 text-text/40" />
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            className={`w-full bg-transparent font-sans text-text outline-none placeholder:text-text/40 ${className ?? ""}`}
            {...props}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setVisible((prev) => !prev)}
            aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
            className="shrink-0 text-text/40 transition-colors hover:text-text/70"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);
AuthPasswordInput.displayName = "AuthPasswordInput";

export default AuthPasswordInput;
