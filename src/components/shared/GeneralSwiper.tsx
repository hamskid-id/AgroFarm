"use client";

import { useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SwiperItem {
  id: string | number;
  label: string;
  [key: string]: any; // Allow additional properties
}

interface GeneralSwiperProps<T extends SwiperItem> {
  items: T[];
  onItemClick: (item: T) => void;
  selectedId?: string | number | null;
  renderItem?: (item: T, isSelected: boolean) => ReactNode;
  showAllButton?: boolean;
  allButtonLabel?: string;
  onAllClick?: () => void;
  className?: string;
  itemClassName?: string;
  selectedItemClassName?: string;
  isLoading?: boolean;
  loadingSkeleton?: ReactNode;
}

function GeneralSwiper<T extends SwiperItem>({
  items,
  onItemClick,
  selectedId = null,
  renderItem,
  showAllButton = false,
  allButtonLabel = "All",
  onAllClick,
  className,
  itemClassName,
  selectedItemClassName,
  isLoading = false,
  loadingSkeleton,
}: GeneralSwiperProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  if (isLoading && loadingSkeleton) {
    return <>{loadingSkeleton}</>;
  }

  if (items.length === 0) return null;

  return (
    <div className={cn("w-full min-w-0 overflow-hidden", className)}>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 scroll-smooth cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {showAllButton && onAllClick && (
          <button
            type="button"
            onClick={onAllClick}
            className={cn(
              "h-10 rounded-full px-4 py-2 transition-colors whitespace-nowrap flex-shrink-0 text-[12px] font-medium",
              selectedId === null
                ? "bg-primary hover:bg-primary/90 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
                : "bg-gray-200 hover:bg-gray-300 text-gray-500"
            )}
          >
            {allButtonLabel}
          </button>
        )}

        {items.map((item) => {
          const isSelected = selectedId === item.id;

          if (renderItem) {
            return (
              <div
                key={item.id}
                onClick={() => onItemClick(item)}
                className="flex-shrink-0 cursor-pointer"
              >
                {renderItem(item, isSelected)}
              </div>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemClick(item)}
              className={cn(
                "h-10 rounded-full px-4 py-2 transition-colors whitespace-nowrap flex-shrink-0 text-[12px] font-medium flex items-center",
                isSelected
                  ? cn(
                      "bg-primary hover:bg-primary/90 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black",
                      selectedItemClassName
                    )
                  : cn(
                      "bg-gray-200 hover:bg-gray-300 text-gray-500",
                      itemClassName
                    )
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GeneralSwiper;
