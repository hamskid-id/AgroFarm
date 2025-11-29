"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import CustomInputField from "../ui/custom-input-field";
import CustomButton from "../ui/custom-button";
import AuthLayout from "./Layout";
import {
  ForgotPasswordData,
  ForgotPasswordSchema,
} from "@/schema/forget-password";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FormFieldType } from "@/types";

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const isPending = false;

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmitForm = (values: ForgotPasswordData) => {
    console.log(values);
    // TODO: Send reset email logic here
    router.push("/auth/enter-otp");
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      description="Enter your email address below and we'll send you a link to reset your password."
      enableFooter
      footerLink="/auth/sign-in"
      footerText=""
      footerLinkTitle="Back to Login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="flex w-full flex-col gap-6 mt-6"
        >
          <CustomInputField
            name="email"
            label="Email Address"
            control={form.control}
            fieldType={FormFieldType.EMAIL}
            placeholder="your@email.com"
            disabled={isPending}
          />
          <CustomButton
            disabled={isPending}
            isLoading={isPending}
            title="Send Link"
          />
          <Link
            href="/auth/sign-in"
            className="flex items-center text-sm text-[#333333]"
          >
            <ChevronLeft className="mr-[0.25rem] inline w-4 h-4" size={1} />
            Back to Login
          </Link>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPassword;
