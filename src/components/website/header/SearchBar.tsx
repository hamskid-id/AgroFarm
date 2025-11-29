import { Search } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const SearchBar = () => {
  return (
    <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-xl mx-2 sm:mx-4 order-2 sm:order-1 w-full sm:w-auto">
      <div className="relative w-full group">
        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
        <Input
          placeholder="Search for fresh products, farms, vendors..."
          className="pl-10 h-10 sm:pl-12 pr-20 sm:pr-24 py-2 sm:py-3 w-full border-2 border-gray-100 focus:border-emerald-500 rounded-xl bg-gray-50/50 hover:bg-white transition-all duration-300 text-sm shadow-sm"
        />
        <Button
          size="sm"
          className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg text-xs sm:text-sm px-3 sm:px-4 shadow-md hover:shadow-lg transition-all"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
