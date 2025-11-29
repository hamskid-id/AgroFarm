import SignUp from "@/components/auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate | Login",
  description: "Log into your Unititled account",
};

export default function SignUPPage() {
  return <SignUp />;
}
