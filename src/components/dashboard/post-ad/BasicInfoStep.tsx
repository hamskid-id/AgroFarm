import React from "react";
import { Package } from "lucide-react";
import { CATEGORIES, CONDITIONS } from "../../constants/form-constants";
import { BasicInfoStepProps } from "@/types/dashboard";


const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
          <Package className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What are you selling?
        </h2>
        <p className="text-gray-600">Tell us the basics about your product</p>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-4">
          Choose Category
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFormData({ ...formData, category: cat.id })}
              className={`
                group relative p-4 rounded-2xl transition-all duration-300 hover:scale-105
                ${
                  formData.category === cat.id
                    ? "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-xl shadow-emerald-500/50"
                    : "bg-white border-2 border-gray-200 hover:border-emerald-300 hover:shadow-lg"
                }
              `}
            >
              <div
                className={`text-4xl mb-3 ${
                  formData.category === cat.id ? "scale-110" : ""
                } transition-transform`}
              >
                {cat.icon}
              </div>
              <div
                className={`font-semibold ${
                  formData.category === cat.id ? "text-white" : "text-gray-900"
                }`}
              >
                {cat.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Product Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Product Title
        </label>
        <input
          type="text"
          placeholder="e.g., Farm Fresh Tomatoes - Premium Quality"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full h-[47px] px-4 py-4 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900"
        />
      </div>

      {/* Condition Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-4">
          Condition
        </label>
        <div className="grid grid-cols-3 gap-4">
          {CONDITIONS.map((condition) => (
            <button
              key={condition.value}
              type="button"
              onClick={() =>
                setFormData({ ...formData, condition: condition.value })
              }
              className={`
                p-3 rounded-xl font-semibold transition-all duration-300
                ${
                  formData.condition === condition.value
                    ? "bg-emerald-500 text-white shadow-lg scale-105"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-300"
                }
              `}
            >
              {condition.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
