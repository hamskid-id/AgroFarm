"use client";

import { Star, MapPin, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Farmer } from "@/types";
import CustomAvatar from "@/components/ui/custom-avatar";

interface VendorInfoProps {
  vendor: Farmer;
}

export const VendorInfo = ({ vendor }: VendorInfoProps) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Shield className="h-5 w-5 text-emerald-600" />
        Sold by
      </h3>

      <div className="flex items-start gap-4">
        {/* Vendor Avatar */}
        <CustomAvatar name={vendor?.name || "NA"} className="w-[66px] h-[66px]" />

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900">{vendor.farmName}</h4>
            {vendor.isVerified && (
              <Badge className="bg-blue-100 text-blue-700 text-xs">
                Verified
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{vendor.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium text-gray-900">{vendor.rating}</span>
            </div>
            <span className="text-gray-500">
              ({vendor.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{vendor.responseRate}% response rate</span>
            </div>
            <span>•</span>
            <span>Since {vendor.joinDate}</span>
          </div>
        </div>
      </div>

      {/* Certifications */}
      {vendor.certifications && vendor.certifications.length > 0 && (
        <div className="pt-2">
          <div className="flex flex-wrap gap-2">
            {vendor.certifications.map((cert, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Button variant="outline" className="w-full">
        View Vendor Profile
      </Button>
    </div>
  );
};
