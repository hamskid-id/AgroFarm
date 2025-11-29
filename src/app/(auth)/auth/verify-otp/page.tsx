import VerifyOTP from "@/components/auth/VerifyOtp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate | Login",
  description: "Log into your Unititled account",
};

export default function VerifyOtpPage() {
  return <VerifyOTP />;
}
