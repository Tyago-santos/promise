import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

const FALLBACK_DELAY_MS = 8000;

export default function PreloadPage() {
  const navigate = useNavigate();
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const goToLogin = () => {
      if (hasNavigatedRef.current) return;
      hasNavigatedRef.current = true;
      navigate({
        to: "/login",
        replace: true,
      });
    };

    const fallbackTimer = setTimeout(goToLogin, FALLBACK_DELAY_MS);

    return () => clearTimeout(fallbackTimer);
  }, [navigate]);

  const handleVideoEnd = () => {
    hasNavigatedRef.current = true;
    navigate({
      to: "/login",
      replace: true,
    });
  };

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-black/5 bg-surface shadow-xl shadow-black/10 sm:max-w-sm">
        <video
          className="aspect-square h-full w-full object-cover"
          muted
          autoPlay
          playsInline
          preload="auto"
          src="/video_promise.mp4"
          onEnded={handleVideoEnd}
          onError={handleVideoEnd}
        ></video>
      </div>

      <p className="relative mt-6 text-sm font-medium text-text/60">
        Preparando tudo para você...
      </p>
    </main>
  );
}
