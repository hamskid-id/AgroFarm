import GeneralSwiper from "@/components/shared/GeneralSwiper";
import { ProductCategories } from "@/types";

interface CategoryNavigationProps {
  productCategories: ProductCategories[];
  selectedCategory: string | null;
  onCategoryClick: (category: { id: string; label: string }) => void;
  onAllClick: () => void;
}

const CategoryNavigation = ({
  productCategories,
  selectedCategory,
  onCategoryClick,
  onAllClick,
}: CategoryNavigationProps) => {
  return (
    <div className="bg-white border-b border-gray-100 ">
      <div className="max-w-7xl mx-auto px-4">
        <GeneralSwiper
          items={productCategories}
          onItemClick={onCategoryClick}
          selectedId={selectedCategory}
          showAllButton
          allButtonLabel="All Products"
          onAllClick={onAllClick}
          className="py-3"
        />
      </div>
    </div>
  );
};

export default CategoryNavigation;
