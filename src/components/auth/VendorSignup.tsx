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
import { Checkbox } from "../ui/checkbox";
import { FormFieldType } from "@/types";
import { useRouter } from "next/navigation";
import { VendorFormData, VendorFormSchema } from "@/schema/vendor-signup";

const VendorSignUp: React.FC = () => {
  const isPending = false;
  const router = useRouter();

  const form = useForm<VendorFormData>({
    resolver: zodResolver(VendorFormSchema),
    defaultValues: {
      businessName: "",
      email: "",
      pwd: "",
      cpwd: "",
      businessPhone: "",
      businessAddress: "",
      businessType: "",
      taxId: "",
      agreeToTerms: false,
      agreeToVendorAgreement: false,
    },
  });

  const handleSubmitForm = async (values: VendorFormData) => {
    console.log(values);
    // Vendor registration logic
  };

  return (
    <AuthLayout
      title="Become an AnimalFam Vendor"
      description="Join our marketplace and start selling your products to thousands of customers"
      enableFooter
      footerLink="/auth/sign-in"
      footerText="Already have an account?"
      footerLinkTitle="Log in"
      showBackButton={true}
      backButtonHref="/auth/sign-up"
      backButtonText="Back to customer sign up"
    >
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <span className="text-blue-600">🏪</span>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">
              Vendor Benefits
            </h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Reach thousands of customers</li>
              <li>• Easy inventory management</li>
              <li>• Secure payments</li>
              <li>• Seller dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="flex w-full flex-col gap-4"
        >
          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">
              Business Information
            </h3>

            <CustomInputField
              name="businessName"
              label="Business Name *"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Enter your business name"
              disabled={isPending}
            />

            <CustomInputField
              name="businessType"
              label="Business Type"
              control={form.control}
              fieldType={FormFieldType.SELECT}
              options={[
                { value: "farm", label: "Farm" },
                { value: "butcher", label: "Butcher Shop" },
                { value: "dairy", label: "Dairy Farm" },
                { value: "poultry", label: "Poultry Farm" },
                { value: "fishery", label: "Fishery" },
                { value: "other", label: "Other" },
              ]}
              placeholder="Select business type"
              disabled={isPending}
            />

            <CustomInputField
              name="taxId"
              label="Tax ID / EIN"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Enter your tax identification number"
              disabled={isPending}
            />

            <CustomInputField
              name="businessPhone"
              label="Business Phone *"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="+1 (555) 123-4567"
              disabled={isPending}
            />

            <CustomInputField
              name="businessAddress"
              label="Business Address *"
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              placeholder="Enter your complete business address"
              disabled={isPending}
            />
          </div>

          {/* Account Information */}
          <div className="space-y-4 pt-4">
            <h3 className="font-semibold text-gray-900">Account Information</h3>

            <CustomInputField
              name="email"
              label="Business Email *"
              control={form.control}
              fieldType={FormFieldType.EMAIL}
              placeholder="your@business.com"
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
          </div>

          {/* Agreements */}
          <div className="space-y-3 pt-4">
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
                  <div className="text-sm leading-none">
                    <FormLabel>
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="text-primary hover:underline"
                        target="_blank"
                      >
                        Terms and Conditions
                      </a>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeToVendorAgreement"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="text-sm leading-none">
                    <FormLabel>
                      I agree to the{" "}
                      <a
                        href="/vendor-agreement"
                        className="text-primary hover:underline"
                        target="_blank"
                      >
                        Vendor Agreement
                      </a>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <CustomButton
            disabled={isPending}
            isLoading={isPending}
            title="Apply as Vendor"
            className="mt-6"
          />
        </form>
      </Form>
    </AuthLayout>
  );
};

export default VendorSignUp;
