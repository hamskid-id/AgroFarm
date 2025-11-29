"use client";

import { motion } from "framer-motion";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface Feature {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  value: string;
  label: string;
  description: string;
  color: "blue" | "emerald" | "amber";
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const { icon: Icon, value, label, description, color } = feature;

  const colorConfig = {
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-900",
    },
    emerald: {
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      text: "text-emerald-900",
    },
    amber: {
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      text: "text-amber-900",
    },
  };

  const config = colorConfig[color];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`text-center group p-4 rounded-2xl ${config.bg} border border-transparent hover:border-${color}-200 transition-all duration-300 cursor-default`}
    >
      <div
        className={`w-12 h-12 ${config.iconBg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className={`h-6 w-6 ${config.iconColor}`} />
      </div>
      <div className={`font-bold text-2xl ${config.text} mb-1`}>{value}</div>
      <div className="font-semibold text-gray-800 text-sm mb-1">{label}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </motion.div>
  );
};

export default FeatureCard;
