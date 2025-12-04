import React from "react";
import { Product } from "@/types";
import AlertModal from "@/components/shared/AlertModal";

interface DeleteProductModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product | null;
  onSubmit: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  setIsOpen,
  product,
  onSubmit,
}) => {
  const handleDelete = () => {
    onSubmit();
    setIsOpen(false);
  };

  return (
    <AlertModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      displayIcon={true}
      description={`Are you sure you want to delete "${product?.name}"? This action cannot be undone.`}
      leftAction={{
        label: "Cancel",
        onClick: () => setIsOpen(false),
        className: "border-gray-300",
      }}
      rightAction={{
        label: "Delete",
        onClick: handleDelete,
        className: "bg-red-600 hover:bg-red-700",
      }}
    />
  );
};

export default DeleteProductModal;
