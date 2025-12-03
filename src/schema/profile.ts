import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[0-9+\-\s]+$/, "Please enter a valid phone number"),
  location: z.string().min(2, "Location is required"),
  bio: z.string().max(500, "Bio must be less than 500 characters"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
