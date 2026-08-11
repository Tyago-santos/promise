import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Digite um nome com mais de dois caracteres"),
  email: z.string().email("Digite um email válido"),
  password: z.string().min(4, "A senha deve ter no mínimo 4 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(1, "Campo obrigatório*"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
