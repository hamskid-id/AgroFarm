import React from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { NavigationButtonsProps } from "@/types/dashboard";

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  canProceed,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex gap-4">
      {currentStep > 1 && (
        <button
          onClick={onPrevious}
          className="h-[47px] flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </button>
      )}

      {!isLastStep ? (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="h-[47px] flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-lg disabled:shadow-none"
        >
          Next Step
          <ArrowRight className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={onSubmit}
          disabled={!canProceed}
          className="h-[47px] flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-lg disabled:shadow-none"
        >
          <CheckCircle className="w-5 h-5" />
          Post Ad
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
