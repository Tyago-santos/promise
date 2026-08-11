import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  age: z.coerce.number().int().positive().optional(),
  sex: z.string().optional(),
  city: z.string().optional(),
  place: z.string().optional(),
  bio: z.string().max(500).optional(),
  interests: z.array(z.string()).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
