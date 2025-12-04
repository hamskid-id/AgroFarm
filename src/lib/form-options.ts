import { CATEGORIES, CONDITIONS } from "@/components/constants/product";

export const categoryOptions = CATEGORIES.map((cat) => ({
  label: `${cat.icon} ${cat.name}`,
  value: cat.id,
}));

export const conditionOptions = CONDITIONS.map((condition) => ({
  label: condition.label,
  value: condition.value,
}));
