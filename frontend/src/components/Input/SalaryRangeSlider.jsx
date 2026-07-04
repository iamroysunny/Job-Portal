import { useState } from "react";

const SalaryRangeSlider = ({ filters, handleFilterChange }) => {
  const [minSalary, setMinSalary] = useState(filters?.minSalary || "");
  const [maxSalary, setMaxSalary] = useState(filters?.maxSalary || "");

  return (
    <div className="space-y-4">
      {/* Salary Inputs */}
      <div className="grid grid-cols-2 gap-3">
        {/* Min Salary */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Min Salary
          </label>

          <input
            type="number"
            placeholder="0"
            min="0"
            step="1000"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={minSalary}
            onChange={({ target }) => setMinSalary(target.value)}
            onBlur={() =>
              handleFilterChange(
                "minSalary",
                minSalary ? parseInt(minSalary) : ""
              )
            }
          />
        </div>

        {/* Max Salary */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Max Salary
          </label>

          <input
            type="number"
            placeholder="No limit"
            min="0"
            step="1000"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={maxSalary}
            onChange={({ target }) => setMaxSalary(target.value)}
            onBlur={() =>
              handleFilterChange(
                "maxSalary",
                maxSalary ? parseInt(maxSalary) : ""
              )
            }
          />
        </div>
      </div>

      {/* Display Current Range */}
      {(minSalary || maxSalary) && (
        <div className="text-xs text-gray-600 font-medium">
          Range:{" "}
          {minSalary
            ? `Rs. ${Number(minSalary).toLocaleString()}`
            : "Rs. 0"}{" "}
          -{" "}
          {maxSalary
            ? `Rs. ${Number(maxSalary).toLocaleString()}`
            : "No limit"}
        </div>
      )}
    </div>
  );
};

export default SalaryRangeSlider;