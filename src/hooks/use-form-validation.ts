import { PostAdFormData } from "@/types/dashboard";


export const useFormValidation = (
  formData: PostAdFormData,
  images: File[],
  currentStep: number
) => {
  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.category && !!formData.title && !!formData.condition;
      case 2:
        return images.length > 0;
      case 3:
        return (
          !!formData.price && !!formData.description && !!formData.quantity
        );
      case 4:
        return !!formData.location && !!formData.phoneNumber;
      default:
        return false;
    }
  };

  return { canProceed: validateStep() }; // Return the boolean result, not the function
};
