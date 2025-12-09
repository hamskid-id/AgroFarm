import { CONDITIONS } from "@/components/constants/product";


interface ConditionSelectorProps {
  selectedCondition: string;
  onSelect: (condition: string) => void;
}

const ConditionSelector = ({
  selectedCondition,
  onSelect,
}: ConditionSelectorProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Condition
      </label>
      <div className="flex flex-wrap gap-2">
        {CONDITIONS.map((condition) => (
          <button
            key={condition.value}
            type="button"
            onClick={() => onSelect(condition.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
              selectedCondition === condition.value
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white text-gray-700 border-gray-300 hover:border-emerald-400"
            }`}
          >
            {condition.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConditionSelector;
