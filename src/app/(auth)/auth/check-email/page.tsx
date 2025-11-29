import CheckEmail from "@/components/auth/CheckEmail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate | Login",
  description: "Log into your Unititled account",
};

export default function CheckEmailPage() {
  return <CheckEmail />;
}
