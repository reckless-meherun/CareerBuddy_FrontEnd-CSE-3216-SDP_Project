import { useState } from "react";

function FilterSidebar({ isSidebarOpen, toggleSidebar }) {
    // States for the selected filter options
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
    const [selectedSalary, setSelectedSalary] = useState<string | null>(null);

    // Filter options
    const locations = ['New York', 'San Francisco', 'Los Angeles', 'Remote'];
    const industries = ['Tech', 'Finance', 'Healthcare', 'Education'];
    const salaries = ['< $50k', '$50k - $100k', '$100k - $150k', '> $150k'];

    // Function to handle filter changes
    const handleFilterChange = () => {
        console.log('Location:', selectedLocation);
        console.log('Industry:', selectedIndustry);
        console.log('Salary:', selectedSalary);
    };

    return (
        <div
            className={`fixed top-0 left-0 z-50 bg-white dark:bg-gray-700 shadow-md h-full w-64 transform transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-64"
            } md:relative md:translate-x-0`}
        >
            <button
                className="absolute top-4 right-4 text-gray-800 dark:text-gray-100 md:hidden"
                onClick={toggleSidebar}
            >
                ✕
            </button>
            <div className="w-full p-4 sm:p-6 flex flex-col space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Filter Jobs</h2>

                {/* Location Filter */}
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Location</h3>
                    <div className="space-y-3 mt-4">
                        {locations.map((location) => (
                            <label
                                key={location}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="location"
                                    value={location}
                                    checked={selectedLocation === location}
                                    onChange={() => setSelectedLocation(location)}
                                    className="h-4 w-4 text-teal-500 border-gray-300 dark:border-gray-600 focus:ring-teal-500"
                                />
                                <span className="text-sm sm:text-lg text-gray-800 dark:text-white">{location}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Industry Filter */}
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Industry</h3>
                    <div className="space-y-3 mt-4">
                        {industries.map((industry) => (
                            <label
                                key={industry}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="industry"
                                    value={industry}
                                    checked={selectedIndustry === industry}
                                    onChange={() => setSelectedIndustry(industry)}
                                    className="h-4 w-4 text-teal-500 border-gray-300 dark:border-gray-600 focus:ring-teal-500"
                                />
                                <span className="text-sm sm:text-lg text-gray-800 dark:text-white">{industry}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Salary Filter */}
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Salary</h3>
                    <div className="space-y-3 mt-4">
                        {salaries.map((salary) => (
                            <label
                                key={salary}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="salary"
                                    value={salary}
                                    checked={selectedSalary === salary}
                                    onChange={() => setSelectedSalary(salary)}
                                    className="h-4 w-4 text-teal-500 border-gray-300 dark:border-gray-600 focus:ring-teal-500"
                                />
                                <span className="text-sm sm:text-lg text-gray-800 dark:text-white">{salary}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Apply Filters Button */}
                <button
                    onClick={handleFilterChange}
                    className="w-full px-4 py-2 text-sm sm:text-base bg-teal-100 dark:bg-[#558b88] text-black dark:text-white rounded-lg hover:bg-[#558b88] dark:hover:bg-darkGrey focus:outline-none"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}

export default FilterSidebar;
