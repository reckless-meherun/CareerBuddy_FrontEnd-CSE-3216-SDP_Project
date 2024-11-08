import { useState } from "react";

function FilterSidebar() {
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
        // You can apply the filtering logic here, such as calling an API or updating state
    };

    return (
        <div className="w-80 h-800 p-6 m-6 bg-white dark:bg-gray-800 p-6 flex flex-col rounded-lg shadow-lg">
            <h2 className="text-2xl m-6 font-bold text-gray-800 dark:text-white">Filter Jobs</h2>

            {/* Location Filter */}
            <div className="m-6">
                <h3 className="text-xl font-medium font-semibold text-gray-800 dark:text-white">Location</h3>
                <div className="space-y-4 mt-4">
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
                            <span className="text-lg text-gray-800 dark:text-white">{location}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Industry Filter */}
            <div className="m-6">
                <h3 className="text-xl font-medium font-semibold text-gray-800 dark:text-white">Industry</h3>
                <div className="space-y-4 mt-4">
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
                            <span className="text-lg text-gray-800 dark:text-white">{industry}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Salary Filter */}
            <div className="m-6">
                <h3 className="text-xl font-medium font-semibold text-gray-800 dark:text-white">Salary</h3>
                <div className="space-y-4 mt-4">
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
                            <span className="text-lg text-gray-800 dark:text-white">{salary}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Apply Filters Button */}
            <button
                onClick={handleFilterChange}
                className="w-full px-4 py-2 bg-teal-100 dark:bg-[#558b88] text-black dark:text-white rounded-lg hover:bg-[#558b88] dark:hover:bg-darkGrey focus:outline-none"
            >
                Apply Filters
            </button>
        </div>

    );
}

export default FilterSidebar;
