import { z } from "zod/v4";

export const bookingSchema = z.object({
  tourId: z.number().int().positive(),
  travelDate: z.string().date(),
  numTravelers: z.number().int().min(1).max(20),
  message: z.string().max(500).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
