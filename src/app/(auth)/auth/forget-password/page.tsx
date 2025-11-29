import ForgotPassword from "@/components/auth/ForgetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate | Forget Password",
  description: "Request for password update",
};

export default function ForgetPasswordPage() {
  return <ForgotPassword />;
}
