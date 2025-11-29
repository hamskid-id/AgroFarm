"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import CustomButton from "../ui/custom-button";
import AuthLayout from "./Layout";
import { OTPData, OTPSchema } from "@/schema/forget-password";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const VerifyOTP: React.FC = () => {
  const router = useRouter();
  const isPending = false;

  const form = useForm<OTPData>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmitForm = (values: OTPData) => {
    console.log(values);
    // TODO: Verify OTP logic here
    router.push("/auth/check-email");
  };

  return (
    <AuthLayout
      title="Enter Your OTP"
      description="We've sent a 6-digit code to your email. Enter it below to verify your identity."
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
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel></FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field} disabled={isPending}>
                    <InputOTPGroup className="gap-3">
                      <InputOTPSlot
                        index={0}
                        className=" sm:h-[50px] h-[40px] sm:w-[50px] w-[40px] !rounded-[12px] border"
                      />
                      <InputOTPSlot
                        index={1}
                        className=" sm:h-[50px] h-[40px] sm:w-[50px] w-[40px] !rounded-[12px] border"
                      />
                      <InputOTPSlot
                        index={2}
                        className=" sm:h-[50px] h-[40px] sm:w-[50px] w-[40px] !rounded-[12px] border"
                      />
                      <InputOTPSlot
                        index={3}
                        className=" sm:h-[50px] h-[40px] sm:w-[50px] w-[40px] !rounded-[12px] border"
                      />
                      <InputOTPSlot
                        index={4}
                        className=" sm:h-[50px] h-[40px] sm:w-[50px] w-[40px] !rounded-[12px] border"
                      />
                      <InputOTPSlot
                        index={5}
                        className=" sm:h-[50px] h-[40px] sm:w-[50px] w-[40px] !rounded-[12px] border"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomButton
            disabled={isPending}
            isLoading={isPending}
            title="Confirm OTP"
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

export default VerifyOTP;
