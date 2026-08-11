import type { ReactNode } from "react";

type PropsType = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function AuthShell({ title, subtitle, children }: PropsType) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

      <section className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-10">
        <div className="mb-2 h-28 w-28 sm:h-32 sm:w-32">
          <img
            className="block h-full w-full object-contain drop-shadow-sm"
            src="/logo.png"
            alt="Promise"
          />
        </div>

        <div className="w-full max-w-md rounded-3xl border border-black/5 bg-surface/95 p-6 shadow-xl shadow-black/5 backdrop-blur-sm sm:p-8">
          <div className="mb-6 text-center">
            <h4 className="font-display text-2xl font-bold text-text">
              {title}
            </h4>
            {subtitle && (
              <p className="mt-1 text-sm text-text/60">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
