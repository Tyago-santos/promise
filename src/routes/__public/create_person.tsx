import { useState, useRef } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

import ModalPerfilHobbies from "@/components/ModalPerfilHobbies";
import ModalPerfilPhoto from "@/components/ModalPerfilPhoto";

import { useForm } from "react-hook-form";

export const Route = createFileRoute("/__public/create_person")({
  component: App,
  beforeLoad: (ctx) => ({
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
  image: string;
};

function App() {
  const { register, handleSubmit } = useForm<FormTypeCreatePerson>();
  const [arrowSelect, setArrowSelect] = useState(false);
  const [modalHobbies, setModalHobbies] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(false);

  const { ref, ...restSelect } = register("sex");
  const navigate = useNavigate();

  const selectRef = useRef<HTMLSelectElement | null>(null);

  const handleSubmitForm = () => {
    alert("envou");
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
          <h4 className="font-display  text-2xl font-bold text-center mb-6 ">
            Crie seu Perfil
          </h4>
          <input
            {...register("age")}
            className="block bg-gray-300 p-4 rounded-sm font-sans w-full"
            placeholder="Qual sua idade?"
          />
          <div className="flex justify-between items-center bg-gray-300 cursor-pointer  p-4 rounded-sm font-sans  w-full my-3">
            <select
              {...restSelect}
              ref={(el) => {
                ref(el);
                selectRef.current = el;
              }}
              style={{ color: "#686a6e" }}
              className="appearance-none"
            >
              <option value="" disabled selected>
                Qual seu gênero?
              </option>
              <option value="man">Homem</option>
              <option value="woman">Mulher</option>
            </select>
            <div onClick={handleChangeIconSelect}>
              {arrowSelect ? (
                <IoIosArrowDropupCircle size={22} color="#686a6e" />
              ) : (
                <IoIosArrowDropdownCircle size={22} color="#686a6e" />
              )}
            </div>
          </div>

          <input
            {...register("place")}
            className="block bg-gray-300 p-4 rounded-sm font-sans w-full"
            placeholder="Qual sua cidade?"
          />
          <div className="space-y-4">
            <button
              onClick={handleModalHobbies}
              type="button"
              className="group relative bg-gradient-to-br from-white/5 to-white/0
               hover:from-white/10 hover:to-white/0
               border border-white/20 hover:border-primary
               transform transition-all duration-300
               hover:translate-y-[-2px] active:translate-y-0
               shadow-lg hover:shadow-xl hover:shadow-primary/10
               block w-full cursor-pointer p-4 
               rounded-xl font-display font-semibold 
               text-text hover:text-primary
               focus:outline-none focus:ring-2 focus:ring-primary/30
               overflow-hidden
               flex items-center justify-between mt-3"
            >
              <span className="flex items-center gap-3">
                {/* Ícone de interesse */}
                <svg
                  className="w-5 h-5 text-text group-hover:text-primary transition-colors"
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
                className="w-5 h-5 text-text/50 group-hover:text-primary 
                transition-transform transform group-hover:translate-x-1"
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
              className="group relative bg-gradient-to-br from-white/5 to-white/0
               hover:from-white/10 hover:to-white/0
               border border-white/20 hover:border-secondary
               transform transition-all duration-300
               hover:translate-y-[-2px] active:translate-y-0
               shadow-lg hover:shadow-xl hover:shadow-secondary/10
               block w-full cursor-pointer p-4 
               rounded-xl font-display font-semibold 
               text-text hover:text-secondary
               focus:outline-none focus:ring-2 focus:ring-secondary/30
               overflow-hidden
               flex items-center justify-between "
            >
              <span className="flex items-center gap-3">
                {/* Ícone de fotos */}
                <svg
                  className="w-5 h-5 text-text group-hover:text-secondary 
                  transition-colors"
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
                Adicione fotos ao seu perfil
              </span>
              <svg
                className="w-5 h-5 text-text/50 group-hover:text-secondary transition-transform transform group-hover:translate-x-1"
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
            onClick={() =>
              navigate({
                to: "/",
              })
            }
            className="bg-gradient-to-r from-primary shadow-xl  to-secondary block w-full cursor-pointer mt-3 p-4 rounded-sm font-display font-semibold text-text"
            type="submit"
            value="Crie seu perfil"
          />

          <div className="mt-3 cursor-pointer text-center w-full ">
            <Link to="/" className=" mr-2 text-sans text-text ">
              Ja possui um conta? Faça login
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
