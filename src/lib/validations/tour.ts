import { z } from "zod/v4";

export const tourSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  location: z.string().min(1).max(200),
  duration: z.string().min(1).max(50),
  difficulty: z.enum(["easy", "moderate", "hard"]),
  maxGroupSize: z.number().int().min(1).max(50).optional(),
  images: z.array(z.string().url()).default([]),
});

export type TourInput = z.infer<typeof tourSchema>;
