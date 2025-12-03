// components/dashboard/post-ad/components/DetailsStep.tsx (Updated)
"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormFieldType } from "@/types";
import CustomInputField from "@/components/ui/custom-input-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { PostAdFormData } from "@/schema/ad";

interface DetailsStepProps {
  form: UseFormReturn<PostAdFormData>;
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function DetailsStep({ form, tags, setTags }: DetailsStepProps) {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Product Details
        </h2>
        <p className="text-gray-600">
          Provide detailed information about your product
        </p>
      </div>

      {/* Price */}
      <CustomInputField
        name="price"
        label="Price (₦) *"
        control={form.control}
        fieldType={FormFieldType.NUMBER}
        placeholder="25000"
        min={0}
        step={1}
      />

      {/* Description */}
      <CustomInputField
        name="description"
        label="Description *"
        control={form.control}
        fieldType={FormFieldType.TEXTAREA}
        placeholder="Describe your product in detail. Include quantity, quality, storage conditions, etc."
      />

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Tags (Optional)
        </label>
        <div className="flex gap-2 mb-3">
          <Input
            type="text"
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={20}
            className="flex-1"
          />
          <Button type="button" onClick={addTag} disabled={tags.length >= 5}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Maximum 5 tags</p>
      </div>
    </div>
  );
}
