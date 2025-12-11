import { TableColumn } from "../ui/custom-table";

export const initialEditFormState = {
  name: "",
  description: "",
  price: "",
  stockCount: "0",
  status: "active",
  featured: false,
  condition: "fresh",
  inStock: true,
  category: "vegetables",
  location: "",
  tags: "",
};

export const productTableColumns: TableColumn[] = [
  {
    key: "product",
    label: "Product",
    width: "30%",
  },
  {
    key: "category",
    label: "Category",
    align: "center",
  },
  {
    key: "price",
    label: "Price",
    align: "center",
  },
  {
    key: "status",
    label: "Status",
    align: "center",
  },
  {
    key: "rating",
    label: "Rating",
    align: "center",
  },
  {
    key: "stock",
    label: "Stock",
    align: "center",
  },
  {
    key: "postedDate",
    label: "Posted",
    align: "center",
  },
  {
    key: "actions",
    label: "Actions",
    align: "center",
  },
];