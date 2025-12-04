import React from "react";
import { MoreVertical } from "lucide-react";
import CustomDropdown from "@/components/ui/custom-dropdown";
import { Product } from "@/types";
import { getDropdownItems } from "@/lib/dropdown-utils";

interface ActionsCellProps {
  product: Product;
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
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <MoreVertical size={18} className="text-[#444846]" />
        </button>
      }
      items={dropdownItems}
    />
  );
};

export default ActionsCell;
