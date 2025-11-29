"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {  TrendingUp, ArrowRight } from "lucide-react";
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
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

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
              Grow Your Farm Business
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Become a{" "}
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Farmer Seller
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Set up your farm store in minutes, reach buyers directly, and
                grow your agricultural business with our powerful seller tools
                and inspection services.
              </p>
            </div>

            {/* Stats */}

            <div className="flex flex-col items-start mt-2">
              <Button className="mt-1 text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-[12px] lg:h-[68px] h-[44px] lg:w-[254px] w-[144px] flex flex-col items-center lg:text-[20px] text-[14px] font-[600]">
                Start Selling
              </Button>
            </div>
            <div className="w-[282px]">
              <CustomImage src={avatar} style={"w-full h-[32px] my-4"} />
              <h2 className="lg:leading-[20.8px] font-[400] lg:text-[16px] text-[14px] leading-[18px]  text-[purple]">
                Join thousands of successful farmers on AgroMarket.
              </h2>
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
