import ResetPassword from "@/components/auth/ResetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate | Forget Password",
  description: "Request for password update",
};

export default function ResetPasswordPage() {
  return <ResetPassword />;
}
