"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Users, BarChart3, Truck, CreditCard } from "lucide-react";

const SellerBenefits = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Quick Setup",
      description: "Get your farm store live in under 10 minutes",
      color: "orange",
    },
    {
      icon: Users,
      title: "Direct Access",
      description: "Connect directly with thousands of verified buyers",
      color: "amber",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Our inspection services build buyer trust",
      color: "emerald",
    },
    {
      icon: BarChart3,
      title: "Sales Analytics",
      description: "Track performance and optimize your sales",
      color: "blue",
    },
    {
      icon: Truck,
      title: "Logistics Support",
      description: "Seamless delivery coordination nationwide",
      color: "purple",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Get paid instantly with secure transactions",
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
      {benefits.map((benefit, index) => (
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
