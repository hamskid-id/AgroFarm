"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Users,
  Image,
  Phone,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const SellerBenefits = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Quick Setup",
      description: "List your products in minutes - it's free and easy",
      color: "orange",
    },
    {
      icon: Users,
      title: "Direct Access",
      description: "Connect directly with thousands of interested buyers",
      color: "amber",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Our inspection services verify product quality",
      color: "emerald",
    },
    {
      icon: Image,
      title: "Photo Upload",
      description: "Showcase your products with multiple images",
      color: "blue",
    },
    {
      icon: Phone,
      title: "Direct Contact",
      description: "Buyers reach you directly - you control the sale",
      color: "purple",
    },
    {
      icon: TrendingUp,
      title: "Boost Visibility",
      description: "Promote your listings to reach more buyers faster",
      color: "green",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const colorConfig = {
    orange: "bg-orange-100 text-orange-600",
    amber: "bg-amber-100 text-amber-600",
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-4"
    >
      {benefits.map((benefit) => (
        <motion.div
          key={benefit.title}
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 hover:border-orange-200/80 hover:shadow-lg transition-all duration-300 group"
        >
          <div
            className={`w-12 h-12 ${
              colorConfig[benefit.color as keyof typeof colorConfig]
            } rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
          >
            <benefit.icon className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-gray-900 text-sm mb-2">
            {benefit.title}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {benefit.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SellerBenefits;
