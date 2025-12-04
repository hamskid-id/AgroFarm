import React from "react";
import { MapPin, Phone, AlertCircle, MapPinIcon } from "lucide-react";

import { CATEGORIES, SAFETY_TIPS } from "../../constants/form-constants";
import { LocationStepProps } from "@/types/dashboard";

const LocationStep: React.FC<LocationStepProps> = ({
  formData,
  setFormData,
}) => {
  const selectedCategory = CATEGORIES.find((c) => c.id === formData.category);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
          <MapPinIcon className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Location & Contact
        </h2>
        <p className="text-gray-600">How can buyers reach you?</p>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="City, State (e.g., Lagos, Ikeja)"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-gray-900"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            placeholder="+234 XXX XXX XXXX"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-gray-900"
          />
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Safety Tips</h5>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {SAFETY_TIPS.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Preview Card */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-lg">📋</span> Ad Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 text-sm">Title</span>
            <span className="font-semibold text-gray-900 text-sm text-right">
              {formData.title || "—"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 text-sm">Category</span>
            <span className="font-semibold text-gray-900 text-sm">
              {selectedCategory?.name || "—"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 text-sm">Quantity</span>
            <span className="font-semibold text-gray-900 text-sm">
              {formData.quantity
                ? `${formData.quantity} ${formData.unit}`
                : "—"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 text-sm">Price</span>
            <span className="font-bold text-emerald-600 text-lg">
              ₦
              {formData.price ? parseInt(formData.price).toLocaleString() : "0"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 text-sm">Location</span>
            <span className="font-semibold text-gray-900 text-sm text-right">
              {formData.location || "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
