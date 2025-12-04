import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderSectionProps {
  onAddNew: () => void;
  onAddNewModal?: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  onAddNew,
  onAddNewModal,
}) => {
  return (
    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
        <p className="text-gray-600 mt-1">
          Manage your listed products and track performance
        </p>
      </div>

      <div className="flex items-center gap-4 flex-wrap ms-auto">
        {onAddNewModal && (
          <Button onClick={onAddNewModal} variant="outline" className="mr-2">
            <Plus className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        )}
        <Button
          onClick={onAddNew}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Post New Product
        </Button>
      </div>
    </div>
  );
};

export default HeaderSection;
