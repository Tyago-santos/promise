import { Link, useNavigate } from "@tanstack/react-router";
import { Mail, User } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userStore } from "@/features/profile/hooks/useUserStore";

import AuthInput from "@/features/auth/components/AuthInput";
import AuthPasswordInput from "@/features/auth/components/AuthPasswordInput";
import AuthShell from "@/features/auth/components/AuthShell";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/registerSchema";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });
  const naviagte = useNavigate();
  const addName = userStore((state) => state.addNamePerfil);
  const addEmail = userStore((state) => state.addEmailPerfil);
  const addPassword = userStore((state) => state.addPasswordPerfil);
  const handleSubmitForm = (data: RegisterFormValues) => {
    addEmail(data.email);
    addName(data.name);
    addPassword(data.password);
    naviagte({
      to: "/create_person",
      replace: true,
    });
  };

  return (
    <AuthShell title="Crie sua conta" subtitle="Comece sua jornada no Promise">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <AuthInput
          icon={<User size={18} />}
          placeholder="Digite seu nome"
          error={errors.name?.message}
          {...register("name")}
        />

        <AuthInput
          icon={<Mail size={18} />}
          placeholder="Digite seu email"
          error={errors.email?.message}
          {...register("email")}
        />

        <AuthPasswordInput
          placeholder="Digite sua senha"
          error={errors.password?.message}
          {...register("password")}
        />

        <input
          className="mt-2 block w-full transform cursor-pointer
             rounded-xl border-0 bg-gradient-to-r from-primary to-secondary
             p-4 font-display font-semibold text-text shadow-lg
             transition-all duration-200 hover:from-primary/90
             hover:to-secondary/90 hover:shadow-xl focus:outline-none
             focus:ring-2 focus:ring-secondary/50 active:scale-[0.98]"
          type="submit"
          value="Fazer cadastro"
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
    </AuthShell>
  );
}
