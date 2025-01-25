import { useState } from "react";

interface FilterSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  filters: {
    location: string;
    industry: string;
    salary: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    location: string;
    industry: string;
    salary: string;
  }>>;
}

function FilterSidebar({ isSidebarOpen, toggleSidebar, filters, setFilters }: FilterSidebarProps) {
  // States for the selected filter options
  const [selectedLocation, setSelectedLocation] = useState<string>(filters.location);
  const [selectedIndustry, setSelectedIndustry] = useState<string>(filters.industry);
  const [selectedSalary, setSelectedSalary] = useState<string>(filters.salary);

  // Filter options
  const locations = ["Dhaka", "Khulna", "Chittagong", "Remote"];
  const industries = ["Tech", "Finance", "Healthcare", "Education"];
  const salaries = ["< 50000", "50000 - 100000", "100000 - 1500000", "> 1500"];

  // Function to handle filter changes
  const handleFilterChange = () => {
    setFilters({
      location: selectedLocation,
      industry: selectedIndustry,
      salary: selectedSalary
    });
    toggleSidebar();
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 bg-white dark:bg-gray-700 shadow-md h-full w-64 transform transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-64"
      } md:relative md:translate-x-0`}
    >
      <button
        className="top-4 right-4 absolute md:hidden text-gray-800 dark:text-gray-100"
        onClick={toggleSidebar}
      >
        ✕
      </button>
      <div className="flex flex-col space-y-6 p-4 sm:p-6 w-full">
        <h2 className="font-bold text-gray-800 text-xl sm:text-2xl dark:text-white">Filter Jobs</h2>

        {/* Location Filter */}
        <div>
          <h3 className="font-semibold text-gray-800 text-lg sm:text-xl dark:text-white">Location</h3>
          <div className="space-y-3 mt-4">
            {locations.map((location) => (
              <label key={location} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value={location}
                  checked={selectedLocation === location}
                  onChange={() => setSelectedLocation(location)}
                  className="border-gray-300 dark:border-gray-600 focus:ring-teal-500 w-4 h-4 text-teal-500"
                />
                <span className="text-gray-800 text-sm sm:text-lg dark:text-white">{location}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Industry Filter */}
        <div>
          <h3 className="font-semibold text-gray-800 text-lg sm:text-xl dark:text-white">Industry</h3>
          <div className="space-y-3 mt-4">
            {industries.map((industry) => (
              <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="industry"
                  value={industry}
                  checked={selectedIndustry === industry}
                  onChange={() => setSelectedIndustry(industry)}
                  className="border-gray-300 dark:border-gray-600 focus:ring-teal-500 w-4 h-4 text-teal-500"
                />
                <span className="text-gray-800 text-sm sm:text-lg dark:text-white">{industry}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Filter */}
        <div>
          <h3 className="font-semibold text-gray-800 text-lg sm:text-xl dark:text-white">Salary</h3>
          <div className="space-y-3 mt-4">
            {salaries.map((salary) => (
              <label key={salary} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="salary"
                  value={salary}
                  checked={selectedSalary === salary}
                  onChange={() => setSelectedSalary(salary)}
                  className="border-gray-300 dark:border-gray-600 focus:ring-teal-500 w-4 h-4 text-teal-500"
                />
                <span className="text-gray-800 text-sm sm:text-lg dark:text-white">{salary}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Filters Button */}
        <button
          onClick={handleFilterChange}
          className="bg-gradient-to-r from-teal-500 to-blue-500 shadow-md hover:shadow-lg px-6 py-2 rounded-lg text-white transform transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default FilterSidebar;