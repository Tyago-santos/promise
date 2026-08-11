import Header from "@/shared/components/layout/Header";

import { useRouter } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

import { useMyProfileQuery, useInvalidateMyProfile } from "@/features/profile/query/useMyProfileQuery";
import { updateMyProfile, uploadMyCover, uploadMyPhoto, removeMyPhoto } from "@/features/profile/api/profile";
import { ApiRequestError } from "@/shared/lib/httpClient";

export default function EditProfilePage() {
  const inputImageRefPerfil = useRef<HTMLInputElement | null>(null);
  const inputCoverRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const { data: profile } = useMyProfileQuery();
  const invalidateProfile = useInvalidateMyProfile();

  const [name, setName] = useState("");
  const [bioState, setBioState] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setBioState(profile.bio ?? "");
    }
  }, [profile]);

  const handleChangeImgPerfil = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (coverPreview) URL.revokeObjectURL(coverPreview);
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleClickChange = async () => {
    if (!profile || isSaving) return;
    setFormError(null);
    setIsSaving(true);
    try {
      await updateMyProfile({ name, bio: bioState });

      if (imageFile) {
        const previousPhotos = profile.photos;
        await uploadMyPhoto(imageFile);
        await Promise.all(previousPhotos.map((photo) => removeMyPhoto(photo.id)));
      }

      if (coverFile) {
        await uploadMyCover(coverFile);
      }

      invalidateProfile();
      router.history.back();
    } catch (error) {
      setFormError(
        error instanceof ApiRequestError ? error.message : "Não foi possível salvar as alterações.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const avatar = imagePreview ?? profile?.photos[0]?.url;
  const cover = coverPreview ?? profile?.coverUrl;

  return (
    <main className="bg-background min-h-screen">
      <Header />

      <div className="pt-20 pb-10">
        <div className="w-full h-48 md:h-80 relative overflow-hidden group/cover bg-gray-100">
          {cover ? (
            <img
              className="w-full h-full object-cover"
              src={cover}
              alt="Capa do perfil"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-accent/40" />
          )}

          <button
            type="button"
            onClick={() => inputCoverRef.current?.click()}
            aria-label="Alterar capa do perfil"
            className="absolute inset-0 flex items-center justify-center
            bg-black/0 group-hover/cover:bg-black/40 transition-colors cursor-pointer"
          >
            <Camera
              size={24}
              className="text-white opacity-0 group-hover/cover:opacity-100 transition-opacity"
            />
          </button>

          <input
            className="hidden"
            ref={inputCoverRef}
            onChange={handleChangeCover}
            type="file"
            accept="image/*"
          />
        </div>

        <div className="m-auto max-w-3xl">
        <div className="bg-surface -mt-10 relative z-10 rounded-t-3xl shadow-sm pt-4 pb-6 px-5">
          <div
            className="h-24 w-24 -mt-16 rounded-full overflow-hidden flex items-center
            justify-center relative border-4 border-surface shadow-md bg-gray-100 group/avatar"
          >
            <img
              className="max-w-full max-h-full scale-[1.5]"
              src={avatar ?? "/image_perfil.png"}
              alt="imagem de perfil"
            />

            <button
              onClick={() => inputImageRefPerfil.current?.click()}
              aria-label="Alterar foto de perfil"
              className="absolute inset-0 flex items-center justify-center
              bg-black/0 group-hover/avatar:bg-black/40 transition-colors cursor-pointer"
            >
              <Camera
                size={20}
                className="text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity"
              />
            </button>

            <input
              className="hidden"
              ref={inputImageRefPerfil}
              onChange={handleChangeImgPerfil}
              type="file"
              accept="image/*"
            />
          </div>

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold font-display text-gray-700">
                Nome
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="Digite seu nome"
                className="block bg-gray-100 rounded-2xl px-4 py-3 outline-none
                border-2 border-transparent font-sans mt-2 w-full transition-all
                focus:border-pink-200 focus:ring-2 focus:ring-pink-500/20 focus:bg-white"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold font-display text-gray-700">
                Bio
              </span>
              <textarea
                value={bioState}
                onChange={(e) => setBioState(e.target.value)}
                placeholder="Fale um pouco sobre você"
                className="block bg-gray-100 h-40 resize-none outline-none p-4
                rounded-2xl font-sans mt-2 w-full border-2 border-transparent transition-all
                focus:border-pink-200 focus:ring-2 focus:ring-pink-500/20 focus:bg-white"
                name="bio"
              ></textarea>
            </label>

            {formError && <p className="text-sm text-red-500">{formError}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.history.back()}
                className="flex-1 py-3 rounded-full border border-gray-200 text-gray-600
                font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                onClick={handleClickChange}
                disabled={isSaving}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white
                font-display font-semibold py-3 rounded-full shadow-md hover:shadow-lg
                active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
              >
                {isSaving ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
