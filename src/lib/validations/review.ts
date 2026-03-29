import { z } from "zod/v4";

export const reviewSchema = z.object({
  tourId: z.number().int().positive(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
  photos: z.array(z.string().url()).max(3).default([]),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
