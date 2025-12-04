import { Badge } from "@/components/ui/badge";

export const getConditionBadge = (condition: string) => {
  switch (condition) {
    case "Fresh":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Fresh
        </Badge>
      );
    case "Brand New":
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          New
        </Badge>
      );
    case "Used":
      return (
        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
          Used
        </Badge>
      );
    default:
      return <Badge variant="outline">{condition}</Badge>;
  }
};
