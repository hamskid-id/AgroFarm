"use client";

import { useState } from "react";
import { PostAdFormData } from "@/types/dashboard";
import { useFormValidation } from "@/hooks/use-form-validation";
import BasicInfoStep from "./BasicInfoStep";
import PhotosStep from "./PhotosStep";
import DetailsStep from "./DetailsStep";
import LocationStep from "./LocationStep";
import ModernStepProgress from "./ModernStepProgress";
import { FORM_STEPS } from "@/components/constants/form-constants";
import NavigationButtons from "./NavigationButtons";

const PostAdView = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PostAdFormData>({
    category: "",
    title: "",
    condition: "fresh",
    price: "",
    originalPrice: "",
    quantity: "",
    unit: "kg",
    description: "",
    location: "",
    phoneNumber: "",
    tags: [],
  });
  const [images, setImages] = useState<File[]>([]);

  const { canProceed } = useFormValidation(formData, images, currentStep);

  const handleSubmit = () => {
    alert("🎉 Ad posted successfully!");
    // Here you would typically make an API call
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <PhotosStep images={images} setImages={setImages} />;
      case 3:
        return <DetailsStep formData={formData} setFormData={setFormData} />;
      case 4:
        return <LocationStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post Your Ad
          </h1>
          <p className="text-gray-600">Sell your products in 4 easy steps</p>
        </div>

        {/* Progress */}
        <ModernStepProgress steps={FORM_STEPS} currentStep={currentStep} />

        {/* Form Content */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={FORM_STEPS.length}
          canProceed={canProceed}
          onPrevious={() => setCurrentStep(currentStep - 1)}
          onNext={() => setCurrentStep(currentStep + 1)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default PostAdView;
