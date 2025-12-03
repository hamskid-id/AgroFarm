"use client";

import { CheckCircle } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Photos" },
    { number: 3, label: "Details" },
    { number: 4, label: "Location" },
  ];

  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
        <div
          className="h-full bg-emerald-600 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`
              flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold text-sm
              ${
                currentStep >= step.number
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-400 border-gray-300"
              }
            `}
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
  );
}
