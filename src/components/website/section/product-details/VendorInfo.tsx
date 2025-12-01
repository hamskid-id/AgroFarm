"use client";

import { Star, MapPin, Shield, Clock, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Farmer } from "@/types";
import CustomAvatar from "@/components/ui/custom-avatar";

interface VendorInfoProps {
  vendor: Farmer;
}

export const VendorInfo = ({ vendor }: VendorInfoProps) => {
  const handleViewProfile = () => {
    // Navigate to vendor profile
    console.log("View vendor profile:", vendor.id);
  };

  const handleCallVendor = () => {
    // Handle call vendor
    console.log("Call vendor:", vendor.id);
  };

  return (
    <div className="bg-white rounded-xl p-6 border ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-gray-900">
          Seller Information
        </h3>
        {vendor.isVerified && (
          <Badge className="bg-blue-100 text-blue-700 text-xs flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Verified
          </Badge>
        )}
      </div>

      {/* Vendor Details */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          {/* Vendor Avatar */}
          <CustomAvatar
            name={vendor.name || "NA"}
            className="w-16 h-16 border-2 border-emerald-200"
          />

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-gray-900">{vendor.name}</h4>
              {vendor.isVerified && (
                <CheckCircle className="h-4 w-4 text-blue-500" />
              )}
            </div>

            <p className="text-sm text-gray-600">{vendor.farmName}</p>

            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{vendor.location}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded">
                <Star className="h-4 w-4 text-amber-400 fill-current" />
                <span className="font-bold text-gray-900">{vendor.rating}</span>
              </div>
              <span className="text-sm text-gray-500">
                ({vendor.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Seller Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {vendor.responseRate}%
            </div>
            <p className="text-xs text-gray-500">Response Rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {vendor.deliveryTime}
            </div>
            <p className="text-xs text-gray-500">Avg. Delivery</p>
          </div>
        </div>

        {/* Years on Platform */}
        <div className="flex items-center gap-2 text-sm bg-amber-50 p-3 rounded-lg">
          <Award className="h-4 w-4 text-amber-600" />
          <span className="font-medium text-amber-800">
            5+ YEARS ON AGROFARM
          </span>
        </div>

        {/* Certifications */}
        {vendor.certifications && vendor.certifications.length > 0 && (
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">
              Certifications:
            </h5>
            <div className="flex flex-wrap gap-2">
              {vendor.certifications.slice(0, 3).map((cert, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 space-y-3">
          <Button
            onClick={handleViewProfile}
            variant="outline"
            className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          >
            View Seller Profile
          </Button>
          <Button
            onClick={handleCallVendor}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Contact Seller
          </Button>
        </div>
      </div>
    </div>
  );
};
