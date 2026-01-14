"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  Heart,
  Bell,
  MapPin,
  Search,
} from "lucide-react";
import { Brand } from "@/components/shared/Brand";
import { Button } from "@/components/ui/button";
import { SheetWrapper } from "@/components/ui/custom-sheet";
import { Input } from "@/components/ui/input";
import FavoritesProducts from "./FavoritesProducts";
import NotificationsSheet from "./NotificationsSheet";
import { navLinks } from "@/components/constants/navigation";
import { useFavoritesStore } from "@/stores/favorites-store";

const Header = () => {
  const [isFavoriteSheetOpen, setIsFavoriteSheetOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { getFavoritesCount, favorites } = useFavoritesStore();
  const favoritesCount = getFavoritesCount();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = Math.abs(currentScrollY - lastScrollY);

          if (scrollDelta > 5) {
            const isScrollingUp = currentScrollY < lastScrollY;

            if (isScrollingUp && currentScrollY > 100) {
              setIsVisible(true);
            } else if (!isScrollingUp && currentScrollY > 100) {
              setIsVisible(false);
            }

            if (currentScrollY < 50) {
              setIsVisible(true);
            }

            lastScrollY = currentScrollY;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.5,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/90 px-3 sm:px-6 sm:py-3 py-1">
            <div className="flex items-center justify-between">
              <Brand />

              {/* Desktop Navigation */}
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

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-2 sm:gap-3">
                <NotificationsSheet
                  isOpen={isNotificationsOpen}
                  setIsOpen={setIsNotificationsOpen}
                />

                <SheetWrapper
                  open={isFavoriteSheetOpen}
                  title="Your Wishlist"
                  setOpen={setIsFavoriteSheetOpen}
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative hover:bg-rose-50 transition-colors h-10 w-10 group"
                    >
                      <Heart className="h-5 w-5 text-gray-600 group-hover:text-rose-500 transition-colors" />
                      {favoritesCount > 0 && (
                        <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs flex items-center justify-center shadow-sm">
                          {favoritesCount}
                        </div>
                      )}
                    </Button>
                  }
                >
                  <FavoritesProducts favoritesList={favorites} />
                </SheetWrapper>

                <div className="flex items-center gap-2">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Start Selling
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                  >
                    <Link href="/auth/sign-in">Sign in</Link>
                  </Button>
                </div>
              </div>

              {/* Mobile Hamburger */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-0 z-40 lg:hidden bg-white"
        style={{ top: "88px" }}
      >
        <div className="h-full overflow-y-auto p-6 flex flex-col-justify-between">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-emerald-500 rounded-xl bg-gray-50"
            />
          </div>

          <div>
            {/* Quick Actions */}
            <div className="space-y-3 ">
              <NotificationsSheet
                isOpen={isNotificationsOpen}
                setIsOpen={setIsNotificationsOpen}
              />

              <SheetWrapper
                open={isFavoriteSheetOpen}
                title="Your Wishlist"
                setOpen={setIsFavoriteSheetOpen}
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-rose-50 transition-colors h-10 w-10 group"
                  >
                    <Heart className="h-5 w-5 text-gray-600 group-hover:text-rose-500 transition-colors" />
                    {favoritesCount > 0 && (
                      <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs flex items-center justify-center shadow-sm">
                        {favoritesCount}
                      </div>
                    )}
                  </Button>
                }
              >
                <FavoritesProducts favoritesList={favorites} />
              </SheetWrapper>
            </div>

            {/* Auth Section */}
            <div className="space-y-3 mb-6 pt-6 border-t">
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Selling
              </Button>
              <Button
                variant="outline"
                className="w-full"
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/auth/sign-in">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
