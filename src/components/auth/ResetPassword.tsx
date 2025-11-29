"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import CustomInputField from "../ui/custom-input-field";
import CustomButton from "../ui/custom-button";
import AuthLayout from "./Layout";
import {
  ResetPasswordFormData,
  ResetPasswordFormSchema,
} from "@/schema/reset-password";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FormFieldType } from "@/types";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const isPending = false;

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      pwd: "",
      cpwd: "",
    },
  });

  const handleSubmitForm = (values: ResetPasswordFormData) => {
    console.log(values);
    router.push("/dashboard");
  };

  return (
    <AuthLayout
      title="Create a New Password"
      description={`Enter a new password below. Make sure it’s strong and easy for you to remember.`}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="flex w-full flex-col gap-4 mt-6"
        >
          <CustomInputField
            name="pwd"
            label="Password *"
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
            placeholder="Create a strong password"
            disabled={isPending}
          />
          <CustomInputField
            name="cpwd"
            label="Confirm Password"
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
            placeholder="Confirm your new password"
            disabled={isPending}
          />
          <CustomButton
            disabled={isPending}
            isLoading={isPending}
            title="Reset Password"
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

export default ResetPassword;
