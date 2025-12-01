"use client";

import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle2 } from "lucide-react";

import { FarmerAvatar } from "./FarmerAvatar";
import { Farmer } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FarmerCardProps {
  farmer: Farmer;
}

export const FarmerCard: React.FC<FarmerCardProps> = ({ farmer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="shadow-none p-0 group  border-[none] border-0 hover:border-emerald-200/80 hover:shadow-xl transition-all duration-500 overflow-hidden h-full">
        <CardContent className="p-6">
          {/* Header Section - Vertical Layout */}
          <div className="flex flex-col items-center text-center mb-6">
            {/* Avatar with Verified Badge */}
            <div className="relative mb-4">
              <FarmerAvatar farmer={farmer} size="lg" />
              {farmer.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-lg">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 fill-emerald-50" />
                </div>
              )}
            </div>

            {/* Farm Name and Farmer Name */}
            <h3 className="font-semibold text-gray-900 text-lg group-hover:text-emerald-700 transition-colors mb-1">
              {farmer.farmName}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{farmer.name}</p>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{farmer.location}</span>
            </div>

            {/* Rating and Sales - Single Line */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400 fill-current" />
                <div className="flex items-center gap-2 ">
                  <div className="font-bold text-gray-900 text-lg">
                    {farmer.rating}
                  </div>
                  <div className="text-xs text-gray-500">
                    ({farmer.reviewCount}) reviews
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View Products Button - Hidden by default, slides in on group hover */}
          <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            View Products
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FarmerCard;
