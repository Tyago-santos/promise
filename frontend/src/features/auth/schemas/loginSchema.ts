import { z } from "zod";

const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Campo obrigatório*")
    .regex(EMAIL_PATTERN, "Digite um email válido"),
  password: z
    .string()
    .min(1, "Campo obrigatório*")
    .min(4, "A senha deve ter no mínimo 4 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
