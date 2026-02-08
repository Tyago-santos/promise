import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { useForm } from "react-hook-form";

export const Route = createFileRoute("/__public/login")({
  component: App,
  beforeLoad: (ctx) => ({
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
  const { register, handleSubmit } = useForm<FormType>();
  const navigate = useNavigate();
  const [passwordIcon, setPasswordIcon] = useState(false);

  const handleSubmitForm = () => {
    alert("envou");
  };
  const handleCreatePerfil = () => {
    navigate({ to: "/create_person" });
  };

  return (
    <main className="bg-background">
      <section className="flex flex-col items-center pb-4 justify-center">
        <div className="h-60 w-80">
          <img className="block" src="/logo.png" alt="" />
        </div>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="px-4">
          <h4 className="font-display  text-2xl font-bold text-center my-6">
            Faça Login
          </h4>
          <div
            className="flex items-center justify-between  
                block bg-gray-300 p-4 rounded-sm font-sans mt-3 w-full"
          >
            <input
              {...register("password")}
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
          <input
            {...register("email")}
            placeholder="Digite seu email"
            className="block bg-gray-300 block p-4 rounded-sm font-sans mt-3 w-full"
          />
          <input
            onClick={handleCreatePerfil}
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
            <Link to="/register" className=" mr-2 text-sans text-text ">
              Não possui uma conta? Faça cadastro
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
