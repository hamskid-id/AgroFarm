import { CheckCircle, ChevronRight } from "lucide-react";

interface Step {
  number: number;
  label: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  onBack?: () => void;
}

export const StepProgress = ({
  steps,
  currentStep,
  onBack,
}: StepProgressProps) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
          Back to Dashboard
        </button>
      )}
      <div className="text-sm text-gray-600">
        Step {currentStep} of {steps.length}
      </div>
    </div>

    <div className="relative">
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
        <div
          className="h-full bg-emerald-600 transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold text-sm ${
                currentStep >= step.number
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-400 border-gray-300"
              }`}
            >
              {currentStep > step.number ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                step.number
              )}
            </div>
            <span className="mt-2 text-xs text-gray-600 hidden sm:block">
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
