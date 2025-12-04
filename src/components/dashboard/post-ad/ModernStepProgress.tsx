import React from "react";
import { CheckCircle } from "lucide-react";
import { Step } from "@/types/dashboard";

interface ModernStepProgressProps {
  steps: Step[];
  currentStep: number;
}

const ModernStepProgress: React.FC<ModernStepProgressProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 -z-10">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Step Items */}
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center flex-1"
            >
              <div
                className={`
                w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3 transition-all duration-300 relative
                ${
                  isCurrent
                    ? "bg-emerald-500 shadow-lg shadow-emerald-500/50 scale-110"
                    : ""
                }
                ${isCompleted ? "bg-emerald-500" : ""}
                ${
                  !isCurrent && !isCompleted
                    ? "bg-white border-2 border-gray-300"
                    : ""
                }
              `}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <span className={isCurrent ? "text-white" : "text-gray-400"}>
                    {step.icon}
                  </span>
                )}
              </div>
              <div
                className={`
                text-sm font-medium transition-colors
                ${isCurrent ? "text-emerald-600" : ""}
                ${isCompleted ? "text-emerald-600" : ""}
                ${!isCurrent && !isCompleted ? "text-gray-400" : ""}
              `}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModernStepProgress;
