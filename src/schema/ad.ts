// lib/validations/ad.ts
import { z } from "zod";

export const postAdSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(80, "Title must be less than 80 characters"),
  category: z.string().min(1, "Please select a category"),
  condition: z.enum(["fresh", "processed", "organic"]),
  price: z.string().min(1, "Price is required"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be less than 500 characters"),
  location: z.string().min(1, "Location is required"),
  phoneNumber: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[0-9+\-\s]+$/, "Please enter a valid phone number"),
});

export type PostAdFormData = z.infer<typeof postAdSchema>;
