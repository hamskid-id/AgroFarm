"use client";

import { useState } from "react";
import { Brand } from "../../shared/Brand";
import SearchBar from "./SearchBar";
import HeaderActions from "./HeaderActions";
import TopBanner from "./TopBanner";

const Header = () => {
  const [isFavoriteSheetOpen, setIsFavoriteSheetOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: { id: string; label: string }) => {
    setSelectedCategory(category.id === selectedCategory ? null : category.id);
  };

  const handleAllClick = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      <TopBanner />
      <header className="bg-white border-b sticky top-0 z-50 backdrop-blur-md bg-white/95 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Logo Section */}
            <Brand />

            {/* Search Bar */}
            <SearchBar />

            {/* Right Side Actions */}
            <HeaderActions
              isFavoriteSheetOpen={isFavoriteSheetOpen}
              setIsFavoriteSheetOpen={setIsFavoriteSheetOpen}
              isNotificationsOpen={isNotificationsOpen}
              setIsNotificationsOpen={setIsNotificationsOpen}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
