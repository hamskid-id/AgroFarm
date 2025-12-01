import { Search } from "lucide-react";
import { Input } from "../../ui/input";

const SearchBar = () => {
  return (
    <div className="flex-1 md:flex hidden max-w-xs sm:max-w-md lg:max-w-xl mx-2 sm:mx-4 order-2 sm:order-1 w-full sm:w-auto">
      <div className="relative w-full group">
        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
        <Input
          placeholder="Search for fresh products, farms, vendors..."
          className="pl-10 h-10 sm:pl-12 pr-20 sm:pr-24 py-2 sm:py-3 w-full border  focus:border-emerald-500 rounded-xl  hover:bg-white transition-all duration-300 text-sm"
        />
        
      </div>
    </div>
  );
};

export default SearchBar;
