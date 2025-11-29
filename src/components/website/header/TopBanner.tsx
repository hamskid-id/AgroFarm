"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Truck,
  Clock,
  Shield,
  X,
  LucideProps,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface Promotion {
  text: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  color: string;
}

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentPromo, setCurrentPromo] = useState(0);

  const promotions: Promotion[] = [
    {
      text: "🚚 Free delivery on orders over ₦25,000!",
      icon: Truck,
      color: "from-orange-500 to-amber-500",
    },
    {
      text: "⏰ Fresh products delivered within 24 hours",
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
    },
    {
      text: "🛡️ Quality guaranteed from trusted farms",
      icon: Shield,
      color: "from-emerald-500 to-green-500",
    },
  ];

  // Auto-rotate promotions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [promotions.length]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Floating dots animation variants
  const floatingDots = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  // Get current promotion
  const currentPromotion = promotions[currentPromo];
  const PromoIcon = currentPromotion.icon;

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white relative overflow-hidden"
    >
      {/* Animated Background Dots */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: dot.top,
              left: dot.left,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Contact Information */}
          <div className="flex items-center gap-4 sm:gap-6 text-sm flex-wrap">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+2348012345678"
              className="flex items-center gap-2 hover:text-amber-300 transition-colors duration-200 group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-1.5 bg-emerald-700/50 rounded-lg group-hover:bg-amber-500 transition-colors backdrop-blur-sm"
              >
                <Phone className="h-3 w-3" />
              </motion.div>
              <span className="font-medium whitespace-nowrap">
                +234 801 234 5678
              </span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:support@farmcart.ng"
              className="flex items-center gap-2 hover:text-amber-300 transition-colors duration-200 group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-1.5 bg-emerald-700/50 rounded-lg group-hover:bg-amber-500 transition-colors backdrop-blur-sm"
              >
                <Mail className="h-3 w-3" />
              </motion.div>
              <span className="font-medium whitespace-nowrap">
                support@farmcart.ng
              </span>
            </motion.a>
          </div>

          {/* Promotional Messages */}
          <div className="flex items-center gap-4 flex-1 justify-center min-w-0">
            <div className="hidden md:flex items-center justify-center min-w-0">
              <div className="relative h-6 w-74 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPromo}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center gap-2"
                  >
                    <PromoIcon className="h-3 w-3 flex-shrink-0" />
                    <span className="text-xs font-semibold whitespace-nowrap truncate">
                      {currentPromotion.text}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close banner"
          >
            <X className="h-3 w-3" />
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600">
        <motion.div
          key={currentPromo}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
        />
      </div>
    </motion.div>
  );
};

export default TopBanner;
