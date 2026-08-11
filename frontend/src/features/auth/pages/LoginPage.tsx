import { Link, useNavigate } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthInput from "@/features/auth/components/AuthInput";
import AuthPasswordInput from "@/features/auth/components/AuthPasswordInput";
import AuthShell from "@/features/auth/components/AuthShell";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/loginSchema";
import { login } from "@/features/auth/services/authService";
import { ApiRequestError } from "@/shared/lib/httpClient";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmitForm = async (data: LoginFormValues) => {
    setFormError(null);
    try {
      await login(data.email, data.password);
      navigate({ to: "/", replace: true });
    } catch (error) {
      setFormError(error instanceof ApiRequestError ? error.message : "Não foi possível fazer login. Tente novamente.");
    }
  };

  return (
    <AuthShell title="Bem-vindo de volta" subtitle="Faça login para continuar">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
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

        {formError && <p className="mb-2 text-sm text-red-500">{formError}</p>}

        <input
          className="mt-2 block w-full transform cursor-pointer
             rounded-xl border-0 bg-gradient-to-r from-primary to-secondary
             p-4 font-display font-semibold text-text shadow-lg
             transition-all duration-200 hover:from-primary/90
             hover:to-secondary/90 hover:shadow-xl focus:outline-none
             focus:ring-2 focus:ring-secondary/50 active:scale-[0.98]
             disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Entrando..." : "Fazer Login"}
        />

        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-sm text-text/70 transition-colors hover:text-primary hover:underline"
          >
            Não possui uma conta?{" "}
            <span className="font-semibold text-text">Faça cadastro</span>
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
