"use client";

import { UseFormReturn } from "react-hook-form";
import { FormFieldType } from "@/types";
import CustomInputField from "@/components/ui/custom-input-field";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, MapPin, Phone } from "lucide-react";
import { CATEGORIES } from "@/components/constants/product";
import { PostAdFormData } from "@/schema/ad";

interface LocationStepProps {
  form: UseFormReturn<PostAdFormData>;
  images: File[];
  categories: typeof CATEGORIES;
}

export default function LocationStep({
  form,
  images,
  categories,
}: LocationStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Location & Contact
        </h2>
        <p className="text-gray-600">Where buyers can find or contact you</p>
      </div>

      {/* Location */}
      <CustomInputField
        name="location"
        label="Location *"
        control={form.control}
        fieldType={FormFieldType.INPUT}
        placeholder="City, State (e.g., Lagos, Ikeja)"
        icon={<MapPin className="h-5 w-5 text-gray-400" />}
      />

      {/* Phone Number */}
      <CustomInputField
        name="phoneNumber"
        label="Phone Number *"
        control={form.control}
        fieldType={FormFieldType.PHONE_INPUT}
        placeholder="+234 XXX XXX XXXX"
        icon={<Phone className="h-5 w-5 text-gray-400" />}
      />

      {/* Safety Notice */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <h5 className="font-medium text-amber-900 mb-2">Safety Tips</h5>
              <ul className="text-amber-800 space-y-1">
                <li>• Meet buyers in safe, public places</li>
                <li>• Don't share sensitive personal information</li>
                <li>• Get full payment before delivery</li>
                <li>• Be wary of suspicious requests</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Summary */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Ad Preview</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Title:</span>
              <span className="font-medium text-gray-900">
                {form.watch("title") || "Not set"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium text-gray-900">
                {categories.find((c) => c.id === form.watch("category"))
                  ?.name || "Not set"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-medium text-emerald-600">
                ₦
                {form.watch("price")
                  ? parseInt(form.watch("price")).toLocaleString()
                  : "0"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium text-gray-900">
                {form.watch("location") || "Not set"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Photos:</span>
              <span className="font-medium text-gray-900">
                {images.length} uploaded
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
