import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  error?: string;
};

const AuthInput = forwardRef<HTMLInputElement, PropsType>(
  ({ icon, error, className, ...props }, ref) => {
    return (
      <div className="mb-4">
        <div
          className={`flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3.5 transition-colors focus-within:ring-2 focus-within:ring-secondary/30 ${
            error
              ? "border-red-400"
              : "border-gray-200 focus-within:border-secondary"
          }`}
        >
          {icon && <span className="shrink-0 text-text/40">{icon}</span>}
          <input
            ref={ref}
            className={`w-full bg-transparent font-sans text-text outline-none placeholder:text-text/40 ${className ?? ""}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);
AuthInput.displayName = "AuthInput";

export default AuthInput;
