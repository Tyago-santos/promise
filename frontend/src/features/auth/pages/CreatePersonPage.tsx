import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Building2, Calendar, ChevronDown, Users } from "lucide-react";

import { ModalPerfilHobbies, ModalPerfilPhoto } from "@/features/profile";
import { updateMyProfile, uploadMyPhoto } from "@/features/profile/api/profile";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userStore } from "@/features/profile/hooks/useUserStore";
import { register as registerUser } from "@/features/auth/services/authService";
import { ApiRequestError } from "@/shared/lib/httpClient";

import AuthInput from "@/features/auth/components/AuthInput";
import AuthShell from "@/features/auth/components/AuthShell";
import {
  createPersonSchema,
  type CreatePersonFormValues,
} from "@/features/auth/schemas/createPersonSchema";

export default function CreatePersonPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePersonFormValues>({
    resolver: zodResolver(createPersonSchema),
  });
  const [modalHobbies, setModalHobbies] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const imagePerfil = userStore((state) => state.image_perfil);
  const intersPerfil = userStore((state) => state.inters);

  const addAge = userStore((state) => state.addAgePerfil);
  const addCity = userStore((state) => state.addCityPerfil);
  const addState = userStore((state) => state.addStatePerfil);

  const { ref, ...restSelect } = register("sex");
  const navigate = useNavigate();

  const handleSubmitForm = async (data: CreatePersonFormValues) => {
    setFormError(null);
    const { name, email, password, imageFile, inters } = userStore.getState();

    if (!name || !email || !password) {
      setFormError("Sessão de cadastro expirada. Volte e preencha seus dados novamente.");
      return;
    }

    try {
      await registerUser({ name, email, password });

      await updateMyProfile({
        age: Number(data.age),
        sex: data.sex,
        place: data.place,
        city: data.city,
        interests: inters,
      });

      if (imageFile) {
        await uploadMyPhoto(imageFile);
      }

      addAge(Number(data.age));
      addState(data.place);
      addCity(data.city);

      navigate({ to: "/", replace: true });
    } catch (error) {
      setFormError(
        error instanceof ApiRequestError ? error.message : "Não foi possível concluir seu cadastro. Tente novamente.",
      );
    }
  };

  const handleModalHobbies = () => {
    setModalHobbies(true);
  };

  return (
    <AuthShell
      title="Crie seu Perfil"
      subtitle="Falta pouco para você começar a se conectar"
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <AuthInput
          icon={<Calendar size={18} />}
          placeholder="Digite sua idade"
          error={errors.age?.message}
          {...register("age")}
        />

        <div className="mb-4">
          <div
            className={`flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3.5 transition-colors focus-within:ring-2 focus-within:ring-secondary/30 ${
              errors.sex
                ? "border-red-400"
                : "border-gray-200 focus-within:border-secondary"
            }`}
          >
            <Users size={18} className="shrink-0 text-text/40" />
            <select
              {...restSelect}
              ref={ref}
              defaultValue=""
              className="w-full appearance-none bg-transparent font-sans text-text outline-none"
            >
              <option value="" disabled className="text-text/40">
                Qual seu gênero?
              </option>
              <option value="man">Homem</option>
              <option value="woman">Mulher</option>
            </select>
            <ChevronDown size={18} className="shrink-0 text-text/40" />
          </div>
          {errors.sex && (
            <p className="mt-1.5 text-sm text-red-500">{errors.sex.message}</p>
          )}
        </div>

        <AuthInput
          icon={<Building2 size={18} />}
          placeholder="Qual seu estado?"
          error={errors.place?.message}
          {...register("place")}
        />

        <AuthInput
          icon={<Building2 size={18} />}
          placeholder="Qual sua cidade?"
          error={errors.city?.message}
          {...register("city")}
        />

        <div className="mt-3 space-y-3">
          <button
            onClick={handleModalHobbies}
            type="button"
            className={`group relative flex w-full cursor-pointer items-center justify-between
              overflow-hidden rounded-xl border p-4 font-display font-semibold
              transition-all duration-200 hover:translate-y-[-1px]
              active:translate-y-0 active:scale-[0.98]
              ${
                intersPerfil
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-gray-200 bg-gray-50 text-text hover:border-primary hover:text-primary"
              }`}
          >
            <span className="flex items-center gap-3">
              <svg
                className={`h-5 w-5 transition-colors ${
                  intersPerfil
                    ? "text-primary"
                    : "text-text/50 group-hover:text-primary"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4
                    12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072
                    0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4
                    0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Quais são suas áreas de interesse?
            </span>
            <svg
              className="h-5 w-5 shrink-0 transform text-text/40 transition-transform group-hover:translate-x-1 group-hover:text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button
            onClick={() => setModalPhoto(true)}
            type="button"
            className={`group relative flex w-full cursor-pointer items-center justify-between
              overflow-hidden rounded-xl border p-4 font-display font-semibold
              transition-all duration-200 hover:translate-y-[-1px]
              active:translate-y-0 active:scale-[0.98]
              ${
                imagePerfil
                  ? "border-secondary bg-secondary/5 text-secondary"
                  : "border-gray-200 bg-gray-50 text-text hover:border-secondary hover:text-secondary"
              }`}
          >
            <span className="flex items-center gap-3">
              <svg
                className={`h-5 w-5 transition-colors ${
                  imagePerfil
                    ? "text-secondary"
                    : "text-text/50 group-hover:text-secondary"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2
                     2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0
                     00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Adicione foto ao seu perfil
            </span>
            <svg
              className="h-5 w-5 shrink-0 transform text-text/40 transition-transform group-hover:translate-x-1 group-hover:text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {formError && <p className="mt-4 text-sm text-red-500">{formError}</p>}

        <input
          className="mt-4 block w-full transform cursor-pointer
             rounded-xl border-0 bg-gradient-to-r from-primary to-secondary
             p-4 font-display font-semibold text-text shadow-lg
             transition-all duration-200 hover:from-primary/90
             hover:to-secondary/90 hover:shadow-xl focus:outline-none
             focus:ring-2 focus:ring-secondary/50 active:scale-[0.98]
             disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Criando perfil..." : "Crie seu perfil"}
        />

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-sm text-text/70 transition-colors hover:text-primary hover:underline"
          >
            Já possui uma conta?{" "}
            <span className="font-semibold text-text">Faça login</span>
          </Link>
        </div>
      </form>

      {modalPhoto && (
        <ModalPerfilPhoto onClose={() => setModalPhoto(false)} />
      )}

      {modalHobbies && (
        <ModalPerfilHobbies onClose={() => setModalHobbies(false)} />
      )}
    </AuthShell>
  );
}
