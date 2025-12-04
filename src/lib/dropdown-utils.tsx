import { Product } from "@/types";
import { DropdownItem } from "@/components/ui/custom-dropdown";
import { Eye, Edit2, CheckCircle, Clock, Trash2 } from "lucide-react";

export const getDropdownItems = (
  product: Product,
  handlers: {
    onView: (product: Product) => void;
    onEdit: (product: Product) => void;
    onToggleStock: (product: Product) => void;
    onToggleStatus: (product: Product) => void;
    onDelete: (product: Product) => void;
  }
): DropdownItem[] => {
  const items: DropdownItem[] = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: () => handlers.onView(product),
    },
    {
      label: "Edit",
      icon: <Edit2 className="h-4 w-4" />,
      onClick: () => handlers.onEdit(product),
    },
    { separator: true },
  ];

  if (product.inStock) {
    items.push(
      {
        label: "Mark as Sold Out",
        icon: <CheckCircle className="h-4 w-4" />,
        onClick: () => handlers.onToggleStock(product),
      },
      {
        label: "Deactivate",
        icon: <Clock className="h-4 w-4" />,
        onClick: () => handlers.onToggleStatus(product),
      }
    );
  } else {
    items.push({
      label: "Restock",
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: () => handlers.onToggleStock(product),
    });
  }

  items.push(
    { separator: true },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => handlers.onDelete(product),
    }
  );

  return items;
};
