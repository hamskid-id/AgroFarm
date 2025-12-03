import { ArrowUp, ArrowDown } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
}

export const StatCard = ({
  icon,
  label,
  value,
  change,
  trend,
}: StatCardProps) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            {trend === "up" ? (
              <ArrowUp className="h-4 w-4 text-emerald-600" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-600" />
            )}
            <span
              className={`text-sm font-medium ${
                trend === "up" ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-emerald-50 rounded-lg">{icon}</div>
    </div>
  </div>
);
