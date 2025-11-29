import { z } from "zod";

export const VendorFormSchema = z
  .object({
    businessName: z
      .string()
      .min(2, "Business name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    pwd: z.string().min(8, "Password must be at least 8 characters"),
    cpwd: z.string(),
    businessPhone: z.string().min(10, "Please enter a valid phone number"),
    businessAddress: z.string().min(10, "Please enter a complete address"),
    businessType: z.string().min(1, "Please select a business type"),
    taxId: z.string().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
    agreeToVendorAgreement: z.boolean().refine((val) => val === true, {
      message: "You must agree to the vendor agreement",
    }),
  })
  .refine((data) => data.pwd === data.cpwd, {
    message: "Passwords don't match",
    path: ["cpwd"],
  });

export type VendorFormData = z.infer<typeof VendorFormSchema>;
