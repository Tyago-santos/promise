import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { useForm } from "react-hook-form";

export const Route = createFileRoute("/__public/login")({
  component: App,
  beforeLoad: () => ({
    head: {
      meta: [
        {
          title: "Login | Promise",
          description: "Faça login na plataforma Promise",
          keywords: "login, autenticação, promise",
        },
      ],
    },
  }),
});

type FormType = {
  password: string;
  email: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const navigate = useNavigate();
  const [passwordIcon, setPasswordIcon] = useState(false);

  const handleSubmitForm = () => {
    alert("envou");
  };
  // const handleCreatePerfil = () => {
  //   navigate({ to: "/create_person" });
  // };

  return (
    <main className="bg-background">
      <section className="flex flex-col items-center pb-4 justify-center">
        <div className="h-60 w-80">
          <img className="block" src="/logo.png" alt="" />
        </div>

        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="px-4 md:w-[30%]"
        >
          <h4 className="font-display   text-2xl font-bold text-center my-6">
            Faça Login
          </h4>
          <div
            className={
              errors.email
                ? `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30 border border-red-500 flex`
                : `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30 flex`
            }
          >
            <input
              {...register("password", {
                required: "Camppo obrigatório*",
                minLength: {
                  value: 4,
                  message: "senha tem ter no mínimo 4 caracteres",
                },
              })}
              placeholder="Digite sua senha"
              type={passwordIcon ? "password" : "text"}
              className="outline-none w-full block"
            />

            <div
              className="cursor-pointer"
              onClick={() => setPasswordIcon((prev) => !prev)}
            >
              {passwordIcon ? (
                <IoMdEyeOff size={22} color="#686a6e" />
              ) : (
                <IoMdEye size={22} color="#686a6e" />
              )}
            </div>
          </div>

          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <input
            {...register("email", {
              required: "Campo obrigatório*",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "este campo só aceita numeros",
              },
            })}
            className={
              errors.email
                ? `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30 border border-red-500`
                : `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30`
            }
            placeholder="Digite seu email"
          />

          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <Link
            to="/forget"
            className="text-text cursor-pointer hover:underline "
          >
            Esqueci minha senha
          </Link>

          <input
            className="bg-gradient-to-r from-primary to-secondary 
             hover:from-primary/90 hover:to-secondary/90
             active:scale-[0.98]
             transform transition-all duration-200
             shadow-lg hover:shadow-xl
             block w-full cursor-pointer mt-3 p-4 
             rounded-lg font-display font-semibold 
             text-text border-0
             focus:outline-none focus:ring-2 focus:ring-secondary/50 w-full "
            type="submit"
            value="Fazer Login"
          />
          <div className="mt-3 cursor-pointer text-center">
            <Link
              to="/register"
              className=" mr-2 text-sans text-text hover:underline "
            >
              Não possui uma conta? Faça cadastro
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
