import { useState, useRef } from "react";
import {
  X,
  Upload,
  Camera,
  Trash2,
  Star,
  Check,
  RotateCw,
  ZoomIn,
  Download,
} from "lucide-react";
type PropsType = {
  onClose: () => void;
};

export default function ModalFotoUnica({ onClose }: PropsType) {
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedPhoto(e.target.result as string);
          setIsEditing(true);
          setRotation(0);
          setZoom(1);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    alert("Funcionalidade de câmera em breve!");
    // Aqui você implementaria a captura real da câmera
  };

  const handleDeletePhoto = () => {
    setUploadedPhoto(null);
    setIsEditing(false);
  };

  const handleRotate = (direction: "left" | "right") => {
    setRotation((prev) => (direction === "right" ? prev + 90 : prev - 90));
  };

  const handleZoom = (type: "in" | "out" | "reset") => {
    if (type === "in") setZoom((prev) => Math.min(prev + 0.2, 3));
    else if (type === "out") setZoom((prev) => Math.max(prev - 0.2, 0.5));
    else setZoom(1);
  };

  const handleConfirm = () => {
    if (uploadedPhoto) {
      console.log("Foto salva:", uploadedPhoto);
      // Aqui você enviaria a foto para o servidor
      setIsEditing(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex 
    justify-center items-center p-4 animate-fadeIn"
    >
      <div
        className="bg-gradient-to-br from-white to-gray-50 w-full max-w-2xl 
      max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden 
      animate-slideUp"
      >
        {/* Header */}
        <div
          className="relative p-6 border-b border-gray-100 bg-gradient-to-r f
        rom-primary/5 to-secondary/5"
        >
          <button
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 
            transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="text-center">
            <h2
              className="text-xl font-bold bg-gradient-to-r from-primary 
            to-secondary bg-clip-text text-transparent"
            >
              {uploadedPhoto ? "Sua Foto de Perfil" : "Adicionar Foto"}
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              {uploadedPhoto
                ? "Esta será a primeira imagem que todos verão"
                : "Escolha uma foto que represente você"}
            </p>
          </div>
        </div>

        {/* Área Principal da Foto */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Container da Foto */}
          <div
            className="relative bg-gradient-to-b from-gray-50 to-white 
          rounded-2xl border-2 border-dashed border-gray-300 p-8 flex flex-col 
          items-center justify-center min-h-[300px]"
          >
            {uploadedPhoto ? (
              <div className="relative w-full max-w-md">
                {/* Container da foto com transformações */}
                <div
                  ref={photoContainerRef}
                  className="relative mx-auto rounded-xl overflow-hidden 
                  shadow-lg bg-white"
                  style={{
                    transform: `rotate(${rotation}deg) scale(${zoom})`,
                    transition: "transform 0.3s ease",
                  }}
                >
                  <img
                    src={uploadedPhoto}
                    alt="Sua foto de perfil"
                    className="w-full h-auto object-contain max-h-[300px] mx-auto"
                  />

                  {/* Overlay de edição quando ativo */}
                  {isEditing && (
                    <div
                      className="absolute inset-0 bg-black/20 flex 
                    items-center justify-center opacity-0 hover:opacity-100 
                    transition-opacity"
                    >
                      <div
                        className="flex gap-2 bg-white/90 backdrop-blur-sm 
                      px-4 py-2 rounded-full shadow-lg"
                      >
                        <button
                          onClick={() => handleRotate("left")}
                          className="p-2 hover:bg-gray-100 rounded-full 
                          transition-colors"
                          title="Girar para esquerda"
                        >
                          <RotateCw className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleZoom("in")}
                          className="p-2 hover:bg-gray-100 rounded-full 
                          transition-colors"
                          title="Aumentar zoom"
                        >
                          <ZoomIn className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleZoom("out")}
                          className="p-2 hover:bg-gray-100 rounded-full 
                          transition-colors"
                          title="Diminuir zoom"
                        >
                          <ZoomIn className="w-4 h-4 text-gray-700 rotate-180" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status da Foto */}
                <div
                  className="mt-6 flex items-center justify-between 
                bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">
                        Foto de Perfil
                      </div>
                      <div className="text-sm text-gray-500">
                        Esta será sua imagem principal
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Ativa</span>
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-primary/60" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Nenhuma foto selecionada
                </h3>
                <p className="text-gray-500 mb-6">
                  Adicione uma foto para personalizar seu perfil
                </p>
              </div>
            )}
          </div>

          {/* Controles de Edição (apenas quando tem foto) */}
          {uploadedPhoto && isEditing && (
            <div className="mt-6 bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                Editar Foto
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => handleRotate("left")}
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RotateCw className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-medium">Girar Esquerda</span>
                </button>
                <button
                  onClick={() => handleRotate("right")}
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RotateCw className="w-4 h-4 text-gray-700 rotate-180" />
                  <span className="text-sm font-medium">Girar Direita</span>
                </button>
                <button
                  onClick={() => handleZoom("in")}
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ZoomIn className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-medium">Zoom +</span>
                </button>
                <button
                  onClick={() => handleZoom("reset")}
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-medium">Redefinir</span>
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Rotacão: {rotation}°</span>
                  <span>Zoom: {zoom.toFixed(1)}x</span>
                </div>
              </div>
            </div>
          )}

          {/* Dicas */}
          <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              Dicas para uma ótima foto
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-700">
                    Sorria naturalmente
                  </div>
                  <div className="text-xs text-gray-500">
                    Mostre sua personalidade
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-700">
                    Boa iluminação
                  </div>
                  <div className="text-xs text-gray-500">
                    Luz natural é a melhor
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-700">
                    Enquadramento claro
                  </div>
                  <div className="text-xs text-gray-500">
                    Rosto visível e centralizado
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-700">
                    Fundo limpo
                  </div>
                  <div className="text-xs text-gray-500">Evite distrações</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer com Botões de Ação */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Botões de Upload/Câmera quando não tem foto */}
            {!uploadedPhoto ? (
              <>
                <button
                  onClick={triggerFileInput}
                  className="flex-1 group bg-white border-2 border-primary 
                  ext-primary font-semibold rounded-xl p-4 flex items-center 
                  justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Upload className="w-5 h-5" />
                  <span>Escolher do Dispositivo</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </button>
                <button
                  onClick={handleCameraCapture}
                  className="flex-1 bg-gradient-to-r from-secondary to-purple-500 text-white font-semibold rounded-xl p-4 flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300"
                >
                  <Camera className="w-5 h-5" />
                  <span>Tirar Foto</span>
                </button>
              </>
            ) : (
              <>
                {/* Botões de Ação quando tem foto */}
                <button
                  onClick={triggerFileInput}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl p-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300"
                >
                  <Upload className="w-5 h-5" />
                  <span>Trocar Foto</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </button>
                <button
                  onClick={handleDeletePhoto}
                  className="flex-1 bg-white border-2 border-red-300 text-red-600 font-semibold rounded-xl p-4 flex items-center justify-center gap-3 hover:bg-red-50 transition-all duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Remover Foto</span>
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl p-4 flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300"
                >
                  <Check className="w-5 h-5" />
                  <span>Salvar Foto</span>
                </button>
              </>
            )}
          </div>

          {/* Informação adicional */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Sua foto de perfil é a primeira impressão que as pessoas terão de
              você
            </p>
            {uploadedPhoto && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 text-primary hover:text-primary/80 text-sm font-medium"
              >
                Quero editar esta foto →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
