import { useState, useRef } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

import ModalPerfilHobbies from "@/components/ModalPerfilHobbies";
import ModalPerfilPhoto from "@/components/ModalPerfilPhoto";

import { useForm } from "react-hook-form";

import { userStore } from "@/store/userStore";

export const Route = createFileRoute("/__public/create_person")({
  component: App,
  beforeLoad: () => ({
    head: {
      meta: [
        {
          title: "Criar Perfil | Promise",
          description: "Crie seu perfil na plataforma Promise",
          keywords: "Criar  perfil, autenticação, promise",
        },
      ],
    },
  }),
});

type FormTypeCreatePerson = {
  age: string;
  sex: string;
  place: string;
  city: string;
  image: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypeCreatePerson>();
  const [arrowSelect, setArrowSelect] = useState(false);
  const [modalHobbies, setModalHobbies] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(false);

  const imagePerfil = userStore((state) => state.image_perfil);
  const intersPerfil = userStore((state) => state.inters);

  const { ref, ...restSelect } = register("sex", {
    required: "campo obrigatório",
  });
  const navigate = useNavigate();

  const selectRef = useRef<HTMLSelectElement | null>(null);

  const handleSubmitForm = () => {
    if (imagePerfil && intersPerfil) {
      navigate({
        to: "/",
        replace: true,
      });
    }
  };

  const handleChangeIconSelect = () => {
    selectRef.current?.showPicker?.();
    setArrowSelect(!arrowSelect);
  };

  const handleModalHobbies = () => {
    setModalHobbies(true);
  };

  return (
    <main className="bg-background">
      <section className="flex flex-col items-center justify-center pb-4 px-4">
        <div className="h-60 w-80">
          <img className="block" src="/logo.png" alt="" />
        </div>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="">
          <h4 className="font-display text-2xl font-bold text-center mb-6">
            Crie seu Perfil
          </h4>
          <label>
            <input
              {...register("age", {
                required: "Campo obrigatório*",
                minLength: { value: 2, message: "Mínimo de 2 números" },
                pattern: {
                  value: /\d/,
                  message: "este campo só aceita numeros",
                },
              })}
              className={
                errors.age
                  ? `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30 border border-red-500`
                  : `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30`
              }
              placeholder="Digite sua idade"
            />

            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </label>

          <div className="flex justify-between items-center bg-gray-300 rounded-lg font-sans w-full my-3">
            <select
              {...restSelect}
              ref={(el) => {
                ref(el);
                selectRef.current = el;
              }}
              style={{ color: "#686a6e" }}
              className="appearance-none bg-transparent p-4 w-full focus:outline-none"
            >
              <option disabled selected>
                Qual seu gênero?
              </option>
              <option value="man">Homem</option>
              <option value="woman">Mulher</option>
            </select>
            <div
              onClick={handleChangeIconSelect}
              className="px-4 cursor-pointer"
            >
              {arrowSelect ? (
                <IoIosArrowDropupCircle size={22} color="#686a6e" />
              ) : (
                <IoIosArrowDropdownCircle size={22} color="#686a6e" />
              )}
            </div>
          </div>
          {errors.sex && <p className="text-red-500">{errors.sex.message}</p>}

          <label>
            <input
              {...register("place", {
                required: "Campo obrigatório*",
                minLength: { value: 2, message: "Mínimo de 2 caracteres" },
              })}
              className={
                errors.place
                  ? `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30 border border-red-500`
                  : `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30`
              }
              placeholder="Qual seu estado?"
            />

            {errors.place && (
              <p className="text-red-500">{errors.place.message}</p>
            )}
          </label>

          <label>
            <input
              {...register("city", { required: "Campo obrigatório*" })}
              className={
                errors.city
                  ? `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30 border border-red-500`
                  : `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30`
              }
              placeholder="Qual sua cidade?"
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </label>
          <div className="space-y-4 mt-3">
            <button
              onClick={handleModalHobbies}
              type="button"
              className={
                intersPerfil
                  ? `group relative bg-gradient-to-br from-white/5 to-white/0
                hover:from-white/10 hover:to-white/0
                border  border-primary
                transform transition-all duration-200
                hover:translate-y-[-2px] active:translate-y-0 active:scale-[0.98]
                shadow-lg hover:shadow-xl hover:shadow-primary/10
                block w-full cursor-pointer p-4 
                rounded-lg font-display font-semibold 
                text-primary
                outline-none ring-2 ring-primary/30
                overflow-hidden
                flex items-center justify-between`
                  : `group relative bg-gradient-to-br from-white/5 to-white/0
                hover:from-white/10 hover:to-white/0
                border border-white/20 hover:border-primary
                transform transition-all duration-200
                hover:translate-y-[-2px] active:translate-y-0 active:scale-[0.98]
                shadow-lg hover:shadow-xl hover:shadow-primary/10
                block w-full cursor-pointer p-4 
                rounded-lg font-display font-semibold 
                text-text hover:text-primary
                focus:outline-none focus:ring-2 focus:ring-primary/30
                overflow-hidden
                flex items-center justify-between`
              }
            >
              <span className="flex items-center gap-3">
                <svg
                  className={
                    intersPerfil
                      ? `w-5 h-5 text-primary transition-colors`
                      : `-5 h-5 text-text group-hover:text-primary transition-colors`
                  }
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
                className={
                  intersPerfil
                    ? `w-5 h-5 text-primary 
                  transition-transform transform group-hover:translate-x-1`
                    : `w-5 h-5 text-text/50 group-hover:text-primary 
                  transition-transform transform group-hover:translate-x-1`
                }
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
              className={
                imagePerfil
                  ? `group relative bg-gradient-to-br from-white/5 to-white/0
                from-white/10 to-white/0
                border border-white/20 border-secondary
                transform transition-all duration-200
                hover:translate-y-[-2px] active:translate-y-0 active:scale-[0.98]
                shadow-lg hover:shadow-xl hover:shadow-secondary/10
                block w-full cursor-pointer p-4 
                rounded-lg font-display font-semibold 
                text-secondary
                outline-none ring-2 ring-secondary/30
                overflow-hidden
                flex items-center justify-between`
                  : `group relative bg-gradient-to-br from-white/5 to-white/0
                hover:from-white/10 hover:to-white/0
                border border-white/20 hover:border-secondary
                transform transition-all duration-200
                hover:translate-y-[-2px] active:translate-y-0 active:scale-[0.98]
                shadow-lg hover:shadow-xl hover:shadow-secondary/10
                block w-full cursor-pointer p-4 
                rounded-lg font-display font-semibold 
                text-text hover:text-secondary
                focus:outline-none focus:ring-2 focus:ring-secondary/30
                overflow-hidden
                flex items-center justify-between`
              }
            >
              <span className="flex items-center gap-3">
                <svg
                  className={
                    imagePerfil
                      ? `w-5 h-5 text-secondary transition-colors`
                      : `w-5 h-5 text-text group-hover:text-secondary transition-colors`
                  }
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
                className={
                  imagePerfil
                    ? `w-5 h-5  text-secondary transition-transform transform group-hover:translate-x-1`
                    : `w-5 h-5  group-hover:text-secondary transition-transform transform group-hover:translate-x-1`
                }
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

          <input
            onClick={handleSubmitForm}
            className="bg-gradient-to-r from-primary to-secondary 
              hover:from-primary/90 hover:to-secondary/90
              active:scale-[0.98]
              transform transition-all duration-200
              shadow-lg hover:shadow-xl
              block w-full cursor-pointer mt-3 p-4 
              rounded-lg font-display font-semibold 
              text-text border-0
              focus:outline-none focus:ring-2 focus:ring-secondary/50"
            type="submit"
            value="Crie seu perfil"
          />

          <div className="mt-3 cursor-pointer text-center w-full">
            <Link
              to="/"
              className="mr-2 text-sans text-text hover:text-primary 
              transition-colors hover:underline"
            >
              Já possui uma conta? Faça login
            </Link>
          </div>
        </form>

        {modalPhoto && (
          <ModalPerfilPhoto onClose={() => setModalPhoto(false)} />
        )}

        {modalHobbies && (
          <ModalPerfilHobbies onClose={() => setModalHobbies(false)} />
        )}
      </section>
    </main>
  );
}
