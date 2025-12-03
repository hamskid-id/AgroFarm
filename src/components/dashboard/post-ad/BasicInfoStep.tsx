// components/dashboard/post-ad/components/BasicInfoStep.tsx
"use client";

import { UseFormReturn } from "react-hook-form";
import CustomInputField from "@/components/ui/custom-input-field";
import { FormFieldType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES, CONDITIONS } from "@/components/constants/product";
import { PostAdFormData } from "@/schema/ad";

interface BasicInfoStepProps {
  form: UseFormReturn<PostAdFormData>;
  categories: typeof CATEGORIES;
  conditions: typeof CONDITIONS;
}

export default function BasicInfoStep({
  form,
  categories,
  conditions,
}: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Basic Information
        </h2>
        <p className="text-gray-600">
          Let's start with the basics about your product
        </p>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Category *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              className={`
                cursor-pointer transition-all hover:border-emerald-400
                ${
                  form.watch("category") === cat.id
                    ? "border-emerald-500 bg-emerald-50"
                    : ""
                }
              `}
              onClick={() => form.setValue("category", cat.id)}
            >
              <CardContent className="p-4">
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-medium text-gray-900">{cat.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Title */}
      <CustomInputField
        name="title"
        label="Product Title *"
        control={form.control}
        fieldType={FormFieldType.INPUT}
        placeholder="e.g., Farm Fresh Tomatoes - Premium Quality (10kg)"
        className="mb-4"
      />

      {/* Condition Selection */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Condition *
        </label>
        <div className="grid grid-cols-3 gap-3">
          {conditions.map((condition) => (
            <Card
              key={condition.value}
              className={`
                cursor-pointer text-center transition-all
                ${
                  form.watch("condition") === condition.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }
              `}
              onClick={() => form.setValue("condition", condition.value)}
            >
              <CardContent className="p-4">
                <div className="font-medium">{condition.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  );
}
