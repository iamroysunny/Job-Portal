import { MapPin, Search } from "lucide-react";

const SearchHeader = ({ filters, handleFilterChange, onSearch }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 lg:p-8 mb-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-5xl font-bold text-gray-900">
          Find Your Dream Job
        </h1>

        <p className="text-gray-600 mt-3">
          Discover opportunities that match your passion
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-[1]" />

          <input
            type="text"
            placeholder="Job title, company or keywords"
            className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl outline-0 text-base bg-white/50 backdrop-blur-sm"
            value={filters.keyword}
            onChange={(e) =>
              handleFilterChange("keyword", e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch?.();
              }
            }}
          />
        </div>

        <div className="relative min-w-0 lg:min-w-[200px]">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-[1]" />

          <input
            type="text"
            placeholder="Location"
            className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl outline-0 text-base bg-white/50 backdrop-blur-sm"
            value={filters.location}
            onChange={(e) =>
              handleFilterChange("location", e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch?.();
              }
            }}
          />
        </div>

        <button
          onClick={() => onSearch?.()}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 lg:px-10 py-3 rounded-xl hover:from-blue-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
        >
          Search Job
        </button>
      </div>
    </div>
  );
};

export default SearchHeader;