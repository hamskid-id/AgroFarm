"use client";

import GeneralSwiper from "@/components/shared/GeneralSwiper";
import { ProductCategories } from "@/types";

interface ProductCategorySwiperProps {
  categories: Array<{ id: string; name: string; count: number; icon: string }>;
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
  onAllClick: () => void;
}

export const ProductCategorySwiper = ({
  categories,
  selectedCategory,
  onCategoryClick,
  onAllClick,
}: ProductCategorySwiperProps) => {
  const swiperItems = categories.map((category) => ({
    id: category.id,
    label: `${category.icon} ${category.name}`,
    count: category.count,
  }));

  return (
    <GeneralSwiper
      items={swiperItems}
      selectedId={selectedCategory}
      onItemClick={(item) => onCategoryClick(item.id as string)}
      showAllButton={true}
      allButtonLabel="All Products"
      onAllClick={onAllClick}
      className="mb-6"
      renderItem={(item, isSelected) => (
        <button
          type="button"
          className={`h-10 rounded-full px-4 py-2 transition-colors whitespace-nowrap flex-shrink-0 text-[12px] font-medium flex items-center gap-2 ${
            isSelected
              ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
              : "bg-gray-200 hover:bg-gray-300 text-gray-500"
          }`}
        >
          {item.label}
          <span className="text-xs opacity-70">({item.count})</span>
        </button>
      )}
    />
  );
};
