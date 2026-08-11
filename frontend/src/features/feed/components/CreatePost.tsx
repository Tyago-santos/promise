import { Image, X } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";

import { useMyProfileQuery } from "@/features/profile/query/useMyProfileQuery";
import { useCreatePostMutation } from "@/features/feed/query/usePostsQuery";
import { uploadFeedImage } from "@/features/feed/api/posts";

const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const { data: profile } = useMyProfileQuery();
  const createPostMutation = useCreatePostMutation();

  const imageRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClickCreatePost = async () => {
    if (!postText.trim() || isPosting) return;

    setIsPosting(true);
    try {
      let imageUrl: string | undefined;
      if (imageFile) {
        const uploaded = await uploadFeedImage(imageFile);
        imageUrl = uploaded.url;
      }

      await createPostMutation.mutateAsync({ description: postText, imageUrl });

      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImageFile(null);
      setImagePreview(null);
      setPostText("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    } finally {
      setIsPosting(false);
    }
  };

  const handleClicInsetImagePost = () => {
    imageRef.current?.click();
  };

  const handleGetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
  };

  const avatar = profile?.photos[0]?.url;

  return (
    <div className="md:mx-auto pt-20 px-4 md:px-0 md:max-w-3xl my-6">
      <div className="bg-surface rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow ring-1 ring-gray-100">
              {avatar ? (
                <img
                  className="w-full h-full object-cover"
                  src={avatar}
                  alt="Imagem de perfil"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent" />
              )}
            </div>
          </div>

          {/* Form */}
          <div className="flex-1">
            <form className="space-y-4">
              {/* Textarea */}
              <div>
                <textarea
                  ref={textareaRef}
                  value={postText}
                  onChange={(e) => {
                    setPostText(e.target.value);
                    const el = e.target;
                    el.style.height = "auto";
                    el.style.height = `${el.scrollHeight}px`;
                  }}
                  className="w-full resize-none outline-none overflow-hidden text-gray-800 placeholder-gray-400 text-lg bg-transparent min-h-[80px]"
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
                    className="flex items-center gap-2 text-gray-500 hover:text-secondary  transition-colors p-2 rounded-lg hover:bg-blue-50"
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
                  disabled={!postText.trim() || isPosting}
                  className={`
                    px-5 py-2.5 rounded-full font-semibold text-sm transition-all
                    ${
                      postText.trim() && !isPosting
                        ? "text-white shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.97] bg-gradient-to-r from-pink-500 to-purple-500"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  {isPosting ? "Publicando..." : "Postar"}
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
                className="size-15 rounded-lg object-cover shadow-sm"
                src={imagePreview}
                alt="imagem post"
              />
              <X
                size={16}
                onClick={handleRemoveImage}
                className="absolute -right-1.5 -top-1.5 z-200 text-white bg-gray-800/80 rounded-full p-0.5 cursor-pointer"
              />
            </div>
          )}

          {postText.length > 0 && (
            <span
              className={`text-xs ${postText.length > 280 ? "text-red-500" : "text-gray-400"}`}
            >
              {postText.length}/280
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
