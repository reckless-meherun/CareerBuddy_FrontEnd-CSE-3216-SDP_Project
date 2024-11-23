import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import myImage from '../assets/JobCover2.jpeg';
import { useSearchJobs } from "../hooks/search";

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate
    const {loading,error,searchJobs} = useSearchJobs();
    

    const jobCategories = [
        { name: "Fullstack Developer", count: 1285, icon: "🖥️" },
        { name: "Cybersecurity Analyst", count: 612, icon: "🛡️" },
        { name: "ML Engineers", count: 212, icon: "🤖" },
        { name: "Graphics Designer", count: 972, icon: "🎨" },
        { name: "Research Scientist", count: 645, icon: "🔬" }
    ];

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await searchJobs({jobTitle:searchTerm, location:location});
            console.log(response);
            navigate('/filtered-jobs', { state: { results: response, criteria: { jobTitle: searchTerm, location: location } } });
        }
        catch(e){
            console.error("Error fetching search results:", e);

        }
        // Navigate to the FilteredJobs page when the search button is clicked
        //navigate('/filtered-jobs');
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen text-gray-800 dark:text-gray-100">
            {/* Hero Section with Overlay */}
            <div className="relative bg-cover bg-center h-[600px] w-full flex items-center justify-center text-center">
                <img
                    src={myImage}  // Referencing the imported image
                    alt="Job Interview"
                    className="absolute left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 p-6 space-y-4">
                    <h1 className="text-2xl sm:text-4xl font-bold text-white">The Easiest Way to Get Your New Job</h1>
                    <p className="text-base sm:text-lg text-white">We offer 12,000 job vacancies right now</p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row rounded-lg items-center justify-center w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2 px-4 sm:px-0">
                        <input
                            type="text"
                            placeholder="Job Keyword"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-72 p-3 rounded-lg focus:outline-none border dark:bg-gray-700 dark:border-gray-900 dark:text-gray-100"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full sm:w-72 p-3 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-900 dark:text-gray-100"
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 bg-teal-100 dark:bg-gray-800  text-black dark:text-white rounded-lg hover:bg-[#558b88] dark:hover:bg-lightGrey focus:outline-none"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Job Categories Section */}
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">Browse Jobs by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {jobCategories.map((category, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-gray-700 shadow-md text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                        >
                            <div className="text-4xl">{category.icon}</div>
                            <h3 className="text-lg font-medium mt-2">{category.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">({category.count} jobs)</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
