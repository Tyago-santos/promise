import { z } from "zod";

export const swipeSchema = z.object({
  targetId: z.coerce.number().int().positive(),
  liked: z.boolean(),
});

export type SwipeInput = z.infer<typeof swipeSchema>;
