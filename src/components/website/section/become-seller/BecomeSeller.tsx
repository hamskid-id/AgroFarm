"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import SellerBenefits from "./SellerBenefits";
import avatar from "../../../../../public/images/Avatar Group.svg";
import { CustomImage } from "@/components/ui/custom-image";

export const BecomeSeller = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-amber-50 via-orange-50/30 to-white overflow-hidden">
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold border border-orange-200">
              <TrendingUp className="h-4 w-4" />
              Sell Your Farm Products
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Start{" "}
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Selling Today
                </span>
              </h2>
              <p className="text-[14px] sm:text-xl text-gray-600 leading-relaxed">
                List your agricultural products for free and connect directly
                with buyers. No commissions, no hassle - just simple, direct
                selling.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-start mt-2">
              <button className="mt-1 text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-[12px] lg:h-[68px] h-[44px] lg:w-[254px] w-[144px] flex items-center justify-center lg:text-[20px] text-[14px] font-[600] hover:shadow-lg transition-shadow duration-300">
                Start Selling Free
              </button>
            </div>

            {/* Social Proof */}
            <div className="w-[282px]">
              <CustomImage src={avatar} style={"w-full h-[32px] my-4"} />
              <p className="lg:leading-[20.8px] font-[400] lg:text-[16px] text-[14px] leading-[18px] text-purple-600">
                Join thousands of successful farmers selling on AgroFarm
              </p>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div variants={itemVariants}>
            <SellerBenefits />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BecomeSeller;