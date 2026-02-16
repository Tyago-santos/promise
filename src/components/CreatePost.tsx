import { posts } from "@/api";
import { Image, Smile, X } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";

const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const [, setFileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const imageRef = useRef<HTMLInputElement>(null);

  const handleClickCreatePost = () => {
    if (imagePreview || postText) {
      posts.push({
        id: posts.length + 1,
        usuario: "tiago_santos",
        nomeUsuario: "Tiago dos Santos",
        imagens: "/image_perfil.png",
        image_post: imagePreview ?? "",
        descricao: postText,
        comentarios: [
          {
            usuario: "joao_pereira",
            texto: "Que lugar incrível!",
            data: "2024-01-15T10:30:00Z",
          },
          {
            usuario: "ana_santos",
            texto: "Adorei as fotos!",
            data: "2024-01-15T11:45:00Z",
          },
        ],
        likes: 10,
        dataPostagem: ` ${new Date()}`,
      });
    }

    setImagePreview("");
    setPostText("");
  };
  const handleClicInsetImagePost = () => {
    imageRef.current?.click();
  };

  const handleGetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFileImage(file);

      if (imagePreview) URL.revokeObjectURL(imagePreview);

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };
  return (
    <div className="bg-white md:m-auto md:max-w-3xl border-b-1  border-gray-200 p-4 mb-6">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
            <img
              className="w-full h-full object-cover"
              src="/image_perfil.png"
              alt="Imagem de perfil"
            />
          </div>
        </div>

        {/* Form */}
        <div className="flex-1">
          <form className="space-y-4">
            {/* Textarea */}
            <div>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="w-full resize-none outline-none text-gray-800 placeholder-gray-500 text-lg bg-transparent min-h-[80px]"
                placeholder="O que você está pensando?"
                rows={2}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end  pr-2   pt-3 border-t border-gray-100">
              <div className="flex gap-2">
                <button
                  onClick={handleClicInsetImagePost}
                  type="button"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-500  transition-colors p-2 rounded-lg hover:bg-blue-50"
                >
                  <Image size={20} />
                  <span className="text-sm font-medium">Foto</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={imageRef}
                    onChange={handleGetImage}
                  />
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleClickCreatePost}
                type="button"
                disabled={!postText.trim()}
                className={`
                  px-4 py-2.5 rounded-full font-medium text-sm transition-all
                  ${
                    postText.trim()
                      ? " hover:bg-gradient-to-r/80 text-white shadow-md hover:shadow-lg   bg-gradient-to-r from-pink-500  to-purple-500"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                Postar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Simple Character Counter */}

      <div className="flex justify-between mt-3 pt-3 ">
        {imagePreview && (
          <div className="relative">
            <img
              className="size-15 rounded-sm"
              src={imagePreview}
              alt="imagem post"
            />
            <X
              onClick={() => setImagePreview("")}
              className="absolute right-0 top-0 z-200 text-text"
            />
          </div>
        )}

        {postText.length > 0 && (
          <span
            className={`text-xs ${postText.length > 280 ? "text-red-500" : "text-gray-500"}`}
          >
            {postText.length}/280
          </span>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
