import { Image, Smile } from "lucide-react";
import { useState } from "react";

const CreatePost = () => {
  const [postText, setPostText] = useState("");

  return (
    <div className="bg-white  border-b-1  border-gray-200 p-4 mb-6">
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
            <div className="flex items-center  pr-2  justify-between pt-3 border-t border-gray-100">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-500  transition-colors p-2 rounded-lg hover:bg-blue-50"
                >
                  <Image size={20} />
                  <span className="text-sm font-medium">Foto</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition-colors p-2 rounded-lg hover:bg-yellow-50"
                >
                  <Smile size={20} />
                  <span className="text-sm font-medium">Emoji</span>
                </button>
              </div>

              {/* Submit Button */}
              <button
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
      {postText.length > 0 && (
        <div className="flex justify-between mt-3 pt-3 ">
          <img
            className="size-15 rounded-sm"
            src="/image_post3.jpg"
            alt="imagem post"
          />
          <span
            className={`text-xs ${postText.length > 280 ? "text-red-500" : "text-gray-500"}`}
          >
            {postText.length}/280
          </span>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
