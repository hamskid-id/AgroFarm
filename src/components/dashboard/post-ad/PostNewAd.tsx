// components/dashboard/post-ad/PostNewAd.tsx
"use client";

import { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { PostAdFormData, postAdSchema } from "@/schema/ad";
import { toast } from "sonner";
import BasicInfoStep from "./BasicInfoStep";
import { CATEGORIES, CONDITIONS } from "@/components/constants/product";
import ProgressBar from "./ProgressBar";
import PhotosStep from "./PhotosStep";
import DetailsStep from "./DetailsStep";
import LocationStep from "./LocationStep";

export default function PostNewAd() {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const form = useForm<PostAdFormData>({
    resolver: zodResolver(postAdSchema),
    defaultValues: {
      title: "",
      category: "",
      condition: "fresh",
      price: "",
      description: "",
      location: "",
      phoneNumber: "",
    },
  });

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          form.getValues("category") &&
          form.getValues("title") &&
          form.getValues("condition")
        );
      case 2:
        return images.length > 0;
      case 3:
        return form.getValues("price") && form.getValues("description");
      case 4:
        return form.getValues("location") && form.getValues("phoneNumber");
      default:
        return false;
    }
  };

  const handleSubmit = async (data: PostAdFormData) => {
    try {
      // Combine form data with images and tags
      const adData = {
        ...data,
        images,
        tags,
        price: parseFloat(data.price),
      };

      // Submit to API
      console.log("Submitting ad:", adData);

      toast.success("Your ad has been posted successfully.");

      // Reset form
      form.reset();
      setImages([]);
      setTags([]);
      setCurrentStep(1);
    } catch (error) {
      toast.error("Failed to post ad. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        <div className="text-sm text-gray-600">Step {currentStep} of 4</div>
      </div>

      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} />

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Step Content */}
          {currentStep === 1 && (
            <BasicInfoStep
              form={form}
              categories={CATEGORIES}
              conditions={CONDITIONS}
            />
          )}

          {currentStep === 2 && (
            <PhotosStep images={images} setImages={setImages} />
          )}

          {currentStep === 3 && (
            <DetailsStep form={form} tags={tags} setTags={setTags} />
          )}

          {currentStep === 4 && (
            <LocationStep form={form} images={images} categories={CATEGORIES} />
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-6 border-t">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </Button>
            )}

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="flex-1"
              >
                Next Step
              </Button>
            ) : (
              <Button type="submit" disabled={!canProceed()} className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Post Ad
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
