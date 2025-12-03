// components/dashboard/profile/components/ProfileInfo.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import CustomInputField from "@/components/ui/custom-input-field";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldType } from "@/types";
import { ProfileFormData, profileSchema } from "@/schema/profile";

interface ProfileInfoProps {
  isEditing: boolean;
}

export default function ProfileInfo({ isEditing }: ProfileInfoProps) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "John Doe",
      businessName: "Green Valley Farm",
      email: "john.doe@example.com",
      phoneNumber: "+234 803 123 4567",
      location: "Kaduna, Nigeria",
      bio: "Passionate farmer with over 10 years of experience in organic farming. We provide fresh, quality produce directly from our farm.",
    },
  });

  const specialties = ["Vegetables", "Organic Farming", "Tomatoes", "Peppers"];

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <Form {...form}>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomInputField
                name="fullName"
                label="Full Name"
                control={form.control}
                fieldType={FormFieldType.INPUT}
                disabled={!isEditing}
              />

              <CustomInputField
                name="businessName"
                label="Farm/Business Name"
                control={form.control}
                fieldType={FormFieldType.INPUT}
                disabled={!isEditing}
              />
            </div>

            <CustomInputField
              name="email"
              label="Email Address"
              control={form.control}
              fieldType={FormFieldType.EMAIL}
              disabled={!isEditing}
            />

            <CustomInputField
              name="phoneNumber"
              label="Phone Number"
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              disabled={!isEditing}
            />

            <CustomInputField
              name="location"
              label="Location"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              disabled={!isEditing}
            />

            <CustomInputField
              name="bio"
              label="Bio"
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              disabled={!isEditing}
            />

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Specialties
              </label>
              <div className="flex flex-wrap gap-2">
                {specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
