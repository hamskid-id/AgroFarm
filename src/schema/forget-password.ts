import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
});

export const OTPSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be 6 digits." })
    .regex(/^\d+$/, { message: "OTP must contain only numbers." }),
});

export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;
export type OTPData = z.infer<typeof OTPSchema>;
