"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Brand } from "@/components/shared/Brand";
import HeaderActions from "./HeaderActions";
import { navLinks } from "@/components/constants/navigation";

const Header = () => {
  const [isFavoriteSheetOpen, setIsFavoriteSheetOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    const isScrollingUp = latest < previous;

    if (isScrollingUp && latest > 100) {
      setIsVisible(true);
    } else if (!isScrollingUp && latest > 100 && latest - previous > 10) {
      setIsVisible(false);
    }

    if (latest < 10) {
      setIsVisible(true);
    }

    setLastScrollY(latest);
  });

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      initial={{ y: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <nav className="bg-white/80 backdrop-blur-lg rounded-2xl  border border-gray-200/90 px-3 sm:px-6 sm:py-3 py-1">
          <div className="flex items-center justify-between">
            <Brand />

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-700 hover:text-orange-500 transition-colors text-sm font-medium flex items-center gap-1 group"
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                  )}
                </Link>
              ))}
            </div>

            <HeaderActions
              isFavoriteSheetOpen={isFavoriteSheetOpen}
              setIsFavoriteSheetOpen={setIsFavoriteSheetOpen}
              isNotificationsOpen={isNotificationsOpen}
              setIsNotificationsOpen={setIsNotificationsOpen}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
