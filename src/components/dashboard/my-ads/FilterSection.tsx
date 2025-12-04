import React from "react";
import { Search, Filter, X, ChevronDown, Star, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomFormField from "@/components/ui/custom-input-field";
import CustomDropdown from "@/components/ui/custom-dropdown";
import { FormFieldType } from "@/types";
import { CATEGORIES } from "@/components/constants/product";

interface FilterSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <Card className="mb-6 shadow-none border border-gray-200">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="search"
              placeholder="Search your products..."
              icon={<Search className="h-5 w-5 text-gray-400" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">In Stock</SelectItem>
                <SelectItem value="inactive">Out of Stock</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>
            <CustomDropdown
              trigger={
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  More Filters
                  <ChevronDown className="h-4 w-4" />
                </Button>
              }
              items={[
                {
                  label: "Organic Products",
                  icon: <Star className="h-4 w-4" />,
                  onClick: () => setFilterStatus("organic"),
                },
                {
                  label: "By Category",
                  icon: <Tag className="h-4 w-4" />,
                  subItems: CATEGORIES.map((cat) => ({
                    label: `${cat.icon} ${cat.name}`,
                    onClick: () => {},
                  })),
                },
                {
                  label: "Clear Filters",
                  icon: <X className="h-4 w-4" />,
                  onClick: () => {
                    setSearchQuery("");
                    setFilterStatus("all");
                  },
                },
              ]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSection;
