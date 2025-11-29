"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import CustomInputField from "../ui/custom-input-field";
import CustomButton from "../ui/custom-button";


import Link from "next/link";
import AuthLayout from "./Layout";
import { FormFieldType } from "@/types";
import { SignInFormData, SignInFormSchema } from "@/schema/sign-in";

const SignIn: React.FC = () => {
  const router = useRouter();
  const isPending = false;

  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      pwd: "",
    },
  });

  const handleSubmitForm = (values: SignInFormData) => {
    //stackbuld-casdooridentity-n6lt8s-24703d-95-111-250-67.traefik.me:8000/login/oauth/authorize?client_id=5cc6d737badeb1b77c3e&response_type=code&redirect_uri=http://localhost:3000/callback&scope=read&state=casdoor
    console.log(values);
    router.push("/dashboard");
  };

  return (
    <AuthLayout
      title="Welcome Back"
      description="Sign in to your AnimalFam account to continue shopping."
      enableFooter
      footerLink="/auth/sign-up"
      footerText={`Don’t have an account?`}
      footerLinkTitle="Sign Up"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="flex w-full flex-col gap-4 mt-6"
        >
          <CustomInputField
            name="email"
            label="Email"
            control={form.control}
            fieldType={FormFieldType.EMAIL}
            placeholder="your@company.com"
            disabled={isPending}
          />
          <CustomInputField
            name="pwd"
            label="Password *"
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
            placeholder="Create a strong password"
            disabled={isPending}
          />
          <Link
            href={"/auth/forget-password"}
            className="ms-auto text-end font-medium sm:text-md text-[13px] text-[#4169E1] hover:text-primary-500 hover:underline transition-colors"
          >
            Forget Password ?
          </Link>
          <CustomButton
            disabled={isPending}
            isLoading={isPending}
            title="Sign in"
          />
        </form>
      </Form>
    </AuthLayout>
  );
};

export default SignIn;
