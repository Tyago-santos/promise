import { z } from "zod";

export const createPostSchema = z.object({
  description: z.string().min(1, "Escreva algo para publicar"),
  imageUrl: z.string().optional(),
});

export const createCommentSchema = z.object({
  text: z.string().min(1, "Comentário não pode ser vazio"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
