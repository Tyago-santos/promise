import { useEffect, useState } from "react";

const STORAGE_KEY = "home_signup_success_modal_seen";

const WelcomeSignupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem(STORAGE_KEY);

    if (!hasSeenModal) {
      setIsOpen(true);
      localStorage.setItem(STORAGE_KEY, "true");
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900">Cadastro feito com sucesso</h2>
        <p className="mt-3 text-sm text-gray-600">
          Sua conta foi criada e voce ja pode usar a plataforma.
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700"
            type="button"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSignupModal;
