import React, { useState } from "react";
import { FileText, X } from "lucide-react";
import { UNITS } from "../../constants/form-constants";
import { DetailsStepProps } from "@/types/dashboard";

const DetailsStep: React.FC<DetailsStepProps> = ({ formData, setFormData }) => {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() && formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
          <FileText className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Product Details
        </h2>
        <p className="text-gray-600">
          Help buyers understand your product better
        </p>
      </div>

      {/* Quantity & Unit */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Quantity
          </label>
          <input
            type="number"
            placeholder="10"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            className="w-full px-4 py-4 border-2 h-[47px] border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Unit
          </label>
          <select
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            className="w-full px-4 py-2 border-2 h-[47px] border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-gray-900"
          >
            {UNITS.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Price (₦)
          </label>
          <input
            type="number"
            placeholder="25,000"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full px-4 py-4 border-2 h-[47px] border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Original Price
            <span className="text-xs font-normal text-gray-500 ml-2">
              (Optional)
            </span>
          </label>
          <input
            type="number"
            placeholder="30,000"
            value={formData.originalPrice}
            onChange={(e) =>
              setFormData({ ...formData, originalPrice: e.target.value })
            }
            className="w-full px-4 py-4 border-2 h-[47px] border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-gray-900"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Description
        </label>
        <textarea
          placeholder="Describe your product in detail. Include quality, storage conditions, harvest date, etc."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={5}
          className="w-full px-4 py-4 border-2  border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all resize-none text-gray-900"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Tags{" "}
          <span className="text-xs font-normal text-gray-500">
            (Optional, max 5)
          </span>
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="e.g., organic, fresh, local"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={20}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-gray-900"
          />
          <button
            type="button"
            onClick={addTag}
            disabled={formData.tags.length >= 5}
            className="px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:text-red-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
