import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Upload, Camera, Trash2, Check } from "lucide-react";

type PropsType = {
  onClose: () => void;
};

import resizeImage from "@/shared/lib/resizeImage";

import { userStore } from "@/features/profile/hooks/useUserStore";

const dicas = [
  { title: "Sorria naturalmente", desc: "Mostre sua personalidade" },
  { title: "Boa iluminação", desc: "Luz natural é a melhor" },
  { title: "Enquadramento claro", desc: "Rosto visível e centralizado" },
  { title: "Fundo limpo", desc: "Evite distrações" },
];

export default function ModalFotoUnica({ onClose }: PropsType) {
  const [compressImage, setCompressImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const addImage = userStore((state) => state.addImagePerfil);
  const addImageFile = userStore((state) => state.addImageFilePerfil);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    if (+fileSize > 10) {
      alert(
        "arquivo muito grande. Só aceitamos arquivos menor do que 10 megas de tamanho",
      );
      return;
    }

    if (file.type.startsWith("image/") && file.size / 1024 / 1024 <= 10) {
      try {
        const compressed = await resizeImage(file);
        setCompressImage(URL.createObjectURL(compressed));
        setCompressedSize((compressed.size / 1024 / 1024).toFixed(2));
        setCompressedFile(compressed);
      } catch (err) {}
    } else {
      alert(
        "formato de arquivo não autorizado. Aceitamos somente jpeg, jpg, png e webp ",
      );
    }
  };

  const handleSalvePhoto = () => {
    if (compressImage && compressedFile) {
      addImage(compressImage);
      addImageFile(compressedFile);
      onClose();
    }
  };

  const handleDeletePhoto = () => {
    setCompressImage(null);
    setCompressedSize(null);
    setCompressedFile(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return createPortal(
    <section className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-primary/15 to-secondary/15">
          <button
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/60 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="text-center pr-8">
            <h2 className="text-xl font-bold text-gray-900">
              {compressImage ? "Sua Foto de Perfil" : "Adicionar Foto"}
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              {compressImage
                ? "Esta será a primeira imagem que todos verão"
                : "Escolha uma foto que represente você"}
            </p>
          </div>
        </div>

        {/* Corpo */}
        <div className="flex-1 overflow-y-auto p-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {compressImage ? (
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg ring-4 ring-white bg-gray-100">
                <img
                  src={compressImage}
                  alt="Sua foto de perfil"
                  className="w-full h-full object-cover"
                />
              </div>
              {compressedSize && (
                <p className="mt-3 text-xs text-gray-400">
                  Tamanho da foto: {compressedSize} MB
                </p>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={triggerFileInput}
              className="w-full flex flex-col items-center justify-center gap-3
                rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50
                py-10 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-700">
                  Toque para escolher uma foto
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  JPEG, PNG ou WEBP · até 10MB
                </p>
              </div>
            </button>
          )}

          {/* Dicas */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
            <h4 className="font-semibold text-gray-700 mb-3 text-sm">
              Dicas para uma ótima foto
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dicas.map((dica) => (
                <div key={dica.title} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 mt-0.5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-700">
                      {dica.title}
                    </div>
                    <div className="text-xs text-gray-500">{dica.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          {compressImage ? (
            <div className="flex gap-3">
              <button
                onClick={handleDeletePhoto}
                className="p-3 border-2 border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                title="Remover foto"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={triggerFileInput}
                className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Trocar</span>
              </button>
              <button
                onClick={handleSalvePhoto}
                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Salvar</span>
              </button>
            </div>
          ) : (
            <button
              onClick={triggerFileInput}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Escolher do dispositivo</span>
            </button>
          )}

          <p className="mt-3 text-center text-xs text-gray-500">
            Sua foto de perfil é a primeira impressão que as pessoas terão de
            você
          </p>
        </div>
      </div>
    </section>,
    document.body,
  );
}
