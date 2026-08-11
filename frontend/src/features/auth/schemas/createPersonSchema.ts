import { z } from "zod";

export const createPersonSchema = z.object({
  age: z
    .string()
    .min(1, "Campo obrigatório*")
    .min(2, "Mínimo de 2 números")
    .regex(/\d/, "este campo só aceita numeros"),
  sex: z.string().min(1, "Campo obrigatório*"),
  place: z
    .string()
    .min(1, "Campo obrigatório*")
    .min(2, "Mínimo de 2 caracteres"),
  city: z.string().min(1, "Campo obrigatório*"),
});

export type CreatePersonFormValues = z.infer<typeof createPersonSchema>;
