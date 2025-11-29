"use client";

import { Farmer } from "@/types";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface FarmerAvatarProps {
  farmer: Farmer;
  size?: "sm" | "md" | "lg";
}

export const FarmerAvatar: React.FC<FarmerAvatarProps> = ({
  farmer,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`${sizeClasses[size]} bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg relative`}
      >
        <span
          className={
            size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-lg"
          }
        >
          {getInitials(farmer.name)}
        </span>
      </motion.div>

      {farmer.isVerified && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-lg"
        >
          <CheckCircle2 className="h-3 w-3 text-emerald-500 fill-emerald-50" />
        </motion.div>
      )}
    </div>
  );
};

export default FarmerAvatar;
