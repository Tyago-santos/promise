import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { useForm } from "react-hook-form";
import { userStore } from "@/store/userStore";

export const Route = createFileRoute("/__public/register")({
  component: App,
  beforeLoad: () => ({
    head: {
      meta: [
        {
          title: "Cadastro | Promise",
          description: "Faça cadastro na plataforma Promise",
          keywords: "cadastro, autenticação, promise",
        },
      ],
    },
  }),
});

type FormType = {
  name: string;
  email: string;
  password: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const [passwordIcon, setPasswordIcon] = useState(false);
  const naviagte = useNavigate();
  const addName = userStore((state) => state.addNamePerfil);
  const addEmail = userStore((state) => state.addEmailPerfil);
  const navigate = useNavigate();
  const handleSubmitForm = (data: FormType) => {
    addEmail(data.email);
    addName(data.name);
    naviagte({
      to: "/create_person",
      replace: true,
    });
  };

  return (
    <main className="bg-background ">
      <section className="flex flex-col items-center justify-center pb-4">
        <div className="h-60 w-80">
          <img className="block" src="/logo.png" alt="" />
        </div>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="md:w-[30%]">
          <h4 className="font-display  text-2xl font-bold text-center my-6 ">
            Esqueceu a senha
          </h4>
          <input
            {...register("name", {
              required: "Camppo obrigatório*",
              minLength: {
                value: 2,
                message: "Digite um nome com mais de dois caracteres",
              },
            })}
            className={
              errors.name
                ? `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30 border border-red-500 flex`
                : `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30 flex`
            }
            placeholder="Digite seu nome"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <input
            {...register("email", {
              required: "Camppo obrigatório*",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Digite um email válido",
              },
            })}
            placeholder="Digite seu email"
            className={
              errors.email
                ? `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30 border border-red-500 flex`
                : `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30 flex`
            }
          />

          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <div
            className={
              errors.password
                ? `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30 border 
            border-red-500 flex items-center justify-between`
                : `block bg-gray-300 p-4 my-2 rounded-lg font-sans w-full 
            focus:outline-none focus:ring-2 focus:ring-secondary/30 flex  
            items-center justify-between `
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
              className="outline-none"
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
            value="Fazer Login"
          />

          <div className="mt-3 cursor-pointer text-center w-full ">
            <Link
              to="/login"
              className=" mr-2 text-sans text-text hover:underline "
            >
              Ja possui um conta? Faça login
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
