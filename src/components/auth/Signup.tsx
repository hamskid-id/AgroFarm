"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CustomInputField from "../ui/custom-input-field";
import CustomButton from "../ui/custom-button";
import AuthLayout from "./Layout";
import { SignUpFormData, SignUpFormSchema } from "@/schema/signup";
import { Checkbox } from "../ui/checkbox";
import { FormFieldType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SignUp: React.FC = () => {
  const isPending = false;
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get("type"); // 'customer' or 'vendor'

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      pwd: "",
      name: "",
      cpwd: "",
      businessName: "",
      businessPhone: "",
      businessAddress: "",
      agreeToTerms: false,
      accountType: (userType as "customer" | "vendor") || "customer",
    },
  });

  const accountType = form.watch("accountType");

  // Update form when URL parameter changes
  useEffect(() => {
    if (userType && (userType === "customer" || userType === "vendor")) {
      form.setValue("accountType", userType);
    }
  }, [userType, form]);

  const handleSubmitForm = async (values: SignUpFormData) => {
    console.log("Registration data:", values);
    // Your registration logic here
  };

  const handleAccountTypeChange = (type: "customer" | "vendor") => {
    form.setValue("accountType", type);

    if (type === "customer") {
      // Clear vendor-specific fields when switching to customer
      form.setValue("businessName", "");
      form.setValue("businessPhone", "");
      form.setValue("businessAddress", "");
    }
  };

  return (
    <AuthLayout
      title={
        accountType === "vendor" ? "Become a Vendor" : "Create Your Account"
      }
      description={
        accountType === "vendor"
          ? "Join AnimalFam as a vendor and start selling your products"
          : "Join AnimalFam and start shopping for fresh products"
      }
      enableFooter
      footerLink="/auth/sign-in"
      footerText={`Already have an account?`}
      footerLinkTitle="Log in"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="flex w-full flex-col gap-4"
        >
          {/* Account Type Selector - Moved INSIDE the Form component */}
          <div className="mb-6">
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
                    I want to:
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleAccountTypeChange("customer")}
                        className={`p-4 border-2 rounded-lg text-center transition-all ${
                          field.value === "customer"
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-lg">🛍️</span>
                          <span className="text-sm font-medium">Shop</span>
                          <span className="text-xs text-gray-500">
                            As Customer
                          </span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAccountTypeChange("vendor")}
                        className={`p-4 border-2 rounded-lg text-center transition-all ${
                          field.value === "vendor"
                            ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-lg">🏪</span>
                          <span className="text-sm font-medium">Sell</span>
                          <span className="text-xs text-gray-500">
                            As Vendor
                          </span>
                        </div>
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {accountType === "vendor" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <span className="text-blue-600 text-sm">🏪</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">
                    Vendor Account
                  </h4>
                  <p className="text-sm text-blue-600">
                    You're creating a vendor account. You'll be able to list
                    products, manage inventory, and sell to customers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Business Name for Vendors */}
          {accountType === "vendor" && (
            <CustomInputField
              name="businessName"
              label="Business Name *"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Enter your business name..."
              disabled={isPending}
            />
          )}

          <CustomInputField
            name="name"
            label={
              accountType === "vendor" ? "Contact Person Name" : "Full Name"
            }
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder={
              accountType === "vendor"
                ? "Enter contact person name..."
                : "Enter your full name..."
            }
            disabled={isPending}
          />

          <CustomInputField
            name="email"
            label="Email *"
            control={form.control}
            fieldType={FormFieldType.EMAIL}
            placeholder={
              accountType === "vendor" ? "your@business.com" : "your@email.com"
            }
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

          <CustomInputField
            name="cpwd"
            label="Confirm Password *"
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
            placeholder="Confirm your password"
            disabled={isPending}
          />

          {/* Additional Vendor Fields */}
          {accountType === "vendor" && (
            <>
              <CustomInputField
                name="businessPhone"
                label="Business Phone"
                control={form.control}
                fieldType={FormFieldType.INPUT}
                placeholder="+1 (555) 123-4567"
                disabled={isPending}
              />

              <CustomInputField
                name="businessAddress"
                label="Business Address"
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                placeholder="Enter your business address..."
                disabled={isPending}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="text-sm leading-none text-muted-foreground">
                  <FormLabel>
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms and Conditions
                    </a>
                    {accountType === "vendor" && (
                      <>
                        {" "}
                        and{" "}
                        <a
                          href="/vendor-agreement"
                          className="text-primary hover:underline"
                          target="_blank"
                        >
                          Vendor Agreement
                        </a>
                      </>
                    )}
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <CustomButton
            disabled={isPending}
            isLoading={isPending}
            title={
              accountType === "vendor" ? "Become a Vendor" : "Create Account"
            }
          />
        </form>
      </Form>
    </AuthLayout>
  );
};

export default SignUp;
