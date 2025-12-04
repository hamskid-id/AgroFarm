import React from "react";
import CustomTable, { TableColumn } from "@/components/ui/custom-table";
import { Product } from "@/types";

interface ProductsTableProps {
  columns: TableColumn[];
  rows: any[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ columns, rows }) => {
  return (
    <div>
      <CustomTable
        columns={columns}
        rows={rows}
        className="border-0"
        tableHeaderClassName="bg-emerald-50"
      />
    </div>
  );
};

export default ProductsTable;
