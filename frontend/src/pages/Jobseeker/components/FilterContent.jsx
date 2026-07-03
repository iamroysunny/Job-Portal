import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../../utils/data";
import SalaryRangeSlider from "../../../components/Input/SalaryRangeSlider";

const FilterSection = ({
  title,
  children,
  isExpanded,
  ontoggle,
}) => (
  <div className="border-b border-gray-200 py-4">
    <button
      onClick={ontoggle}
      className="w-full flex items-center justify-between"
    >
      <span className="font-medium text-gray-800">
        {title}
      </span>

      {isExpanded ? (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      )}
    </button>

    {isExpanded && (
      <div className="mt-4">
        {children}
      </div>
    )}
  </div>
);

const FilterContent = ({
  toggleSection,
  clearAllFilters,
  expandedSections,
  filters,
  handleFilterChange,
}) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Filters
        </h2>

        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Clear All
        </button>
      </div>

      {/* Job Type */}
      <FilterSection
        title="Job Type"
        isExpanded={expandedSections?.jobType}
        ontoggle={() => toggleSection("jobType")}
      >
        <div className="space-y-3">
          {JOB_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring-blue-200 focus:ring-opacity-50"
                checked={filters?.type === type.value}
                onChange={(e) =>
                  handleFilterChange(
                    "type",
                    e.target.checked ? type.value : ""
                  )
                }
              />

              <span className="ml-3 text-gray-700 font-medium">
                {type.value}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Salary */}
      <FilterSection
        title="Salary Range"
        isExpanded={expandedSections?.salary}
        ontoggle={() => toggleSection("salary")}
      >
        <SalaryRangeSlider
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </FilterSection>

      {/* Category */}
      <FilterSection
        title="Category"
        isExpanded={expandedSections?.categories}
        ontoggle={() => toggleSection("categories")}
      >
        <div className="space-y-3">
          {CATEGORIES.map((type) => (
            <label
              key={type.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                checked={filters?.category === type.value}
                onChange={(e) =>
                  handleFilterChange(
                    "category",
                    e.target.checked ? type.value : ""
                  )
                }
              />

              <span className="ml-3 text-gray-700 font-medium">
                {type.value}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );
};

export default FilterContent;