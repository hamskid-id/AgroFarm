import React from "react";
import { ChevronRight, MoreVertical } from "lucide-react";
import CustomDropdown from "@/components/ui/custom-dropdown";
import { Product } from "@/types";
import { getDropdownItems } from "@/lib/dropdown-utils";

interface ActionsCellProps {
  product: Product;
  trigger?: React.ReactNode;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onToggleStock: (product: Product) => void;
  onToggleStatus: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ActionsCell: React.FC<ActionsCellProps> = ({
  product,
  onView,
  onEdit,
  onToggleStock,
  onToggleStatus,
  onDelete,
  trigger,
}) => {
  const dropdownItems = getDropdownItems(product, {
    onView,
    onEdit,
    onToggleStock,
    onToggleStatus,
    onDelete,
  });

  return (
    <CustomDropdown
      trigger={
        <button>
          {trigger || <ChevronRight size={18} className="text-[#444846]" />}
        </button>
      }
      items={dropdownItems}
    />
  );
};

export default ActionsCell;
