import SignIn from "@/components/auth/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate | Login",
  description: "Log into your Unititled account",
};

export default function SignInPage() {
  return <SignIn />;
}
