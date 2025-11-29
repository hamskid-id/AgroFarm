"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import CustomButton from "../ui/custom-button";
import AuthLayout from "./Layout";

const CheckEmail: React.FC = () => {
  const isPending = false;

  const handleResendEmail = () => {
    console.log("Resending email...");
    // TODO: Resend email logic here
  };

  return (
    <AuthLayout
      title="Check Your Email"
      description="We've sent a 6-digit code to your email address. Check your inbox to reset your password."
      enableFooter
      footerLink="/auth/sign-in"
      footerText=""
      footerLinkTitle="Back to Login"
    >
      <div className="flex w-full flex-col gap-6 mt-6">
        <p className="text-sm text-[#333333]">Didn&apos;t get an email?</p>
        <CustomButton
          disabled={isPending}
          isLoading={isPending}
          title="Resend Email"
          onClick={handleResendEmail}
          className="w-full"
        />
        <Link
          href="/auth/sign-in"
          className="flex items-center text-sm text-[#333333]"
        >
          <ChevronLeft className="mr-[0.25rem] inline w-4 h-4" size={1} />
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default CheckEmail;
