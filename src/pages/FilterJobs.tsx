import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import JobPost from '../components/JobPost';
import qs from 'query-string';
import { useSearchJobs } from '../hooks/search';
interface Job {
    id: string;
    title: string;
    description: string;
    location: string;
    experience: number;
    jobType: string;
    deadline: string;
    salary: number;
    company: Company;
    skills: Skill[];
}
interface Skill {
    id: string;
    name: string;
}
interface Company {
    id: string;
    companyName: string;
    location: string;
    phoneNumber: string;
    email: string;
    website: string;
    domain: string;
    description: string;
    size: string;
    foundationYear: string;
    registrationYear: string;
    jobs: any; // Adjust type if necessary
    active: boolean;
}

const FilteredJobs = () => {
    const jobLocation = useLocation();
    const { jobTitle, location } = qs.parse(jobLocation.search); // Extract query parameters
    const { loading, error, searchJobs } = useSearchJobs();
    const navigate = useNavigate(); // Initialize useNavigate
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // State to store fetched jobs and companies
    const [jobPosts, setJobPosts] = useState<Array<any>>([]); // Ensure type safety if using TypeScript
    const [companies, setCompanies] = useState([]);
    const [activeTab, setActiveTab] = useState('jobs'); // State to track active tab
    const [filters, setFilters] = useState({
        location: '',
        industry: '',
        salary: ''
    });

    // Fetch jobs and companies on component mount or when query params change
    useEffect(() => {
        if (jobTitle || location) {
            fetchResults();
        }
        console.log(jobPosts, "job")
    }, [jobTitle, location]);

    const fetchResults = async () => {
        try {
            const response = await searchJobs({ jobTitle, location });
            console.log(response);

            // Safely extract jobs and companies from the response
            const jobs = response.jobs;
            const gotcompanies = response.companies;

            // Set the state for job posts and companies
            setJobPosts(jobs);
            setCompanies(gotcompanies);

            console.log("Response Jobs:", jobs);
            console.log("Response Companies:", gotcompanies);
            console.log("Job Posts:", jobPosts);
            console.log(companies)
        } catch (e) {
            console.log('Error fetching search results:', e);
        }
    };
    useEffect(() => {
        console.log("Updated Job Posts:", jobPosts);
    }, [jobPosts]);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    // Apply additional filtering based on sidebar filters
    const filteredPosts = jobPosts.filter(post =>
        (filters.location ? post.location === filters.location : true) &&
        (filters.industry ? post.company.domain === filters.industry : true) &&
        (filters.salary ? post.salary === parseInt(filters.salary) : true)
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <FilterSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                        onClick={toggleSidebar}
                    ></div>
                )}


                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-8">
                    {/* Hamburger Menu */}
                    <button
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg md:hidden"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ☰
                    </button>

                    {/* Header */}
                    <header className="mb-6">
                        <h2 className="text-3xl font-bold tracking-wide mb-2 text-center md:text-left">
                            Filtered Results
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
                            Explore jobs and companies tailored to your preferences.
                        </p>
                    </header>

                    {/* Tabs */}
                    <div className="mb-6 flex justify-center md:justify-start border-b border-gray-300 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab("jobs")}
                            className={`px-4 py-2 text-lg font-semibold focus:outline-none transition ${activeTab === "jobs"
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
                                }`}
                        >
                            Jobs
                        </button>
                        <button
                            onClick={() => setActiveTab("companies")}
                            className={`ml-4 px-4 py-2 text-lg font-semibold focus:outline-none transition ${activeTab === "companies"
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
                                }`}
                        >
                            Companies
                        </button>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeTab === "jobs" ? (
                            filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    <JobPost
                                        key={post.id}
                                        post={{
                                            id: post.id,
                                            title: post.title,
                                            company: post.company.companyName,
                                            location: post.location,
                                            salary: `${post.salary || "Negotiable"}`,
                                            description: post.description,
                                            existingSkills: post.existingSkills,
                                            newSkills: post.skills,
                                            deadline:post.deadline,
                                            jobType: post.jobType,
                                            experience: post.experience,
                                        }}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                                    No job posts match the selected filters.
                                </p>
                            )
                        ) : companies.length > 0 ? (
                            companies.map((company) => (
                                <div
                                    key={company.id}
                                    className="p-6 bg-white dark:bg-gray-700 shadow rounded-lg transition transform hover:scale-105"
                                >
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                        {company.companyName}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                                        {company.location}
                                    </p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                        {company.description || "No description available."}
                                    </p>
                                    {/* Additional company details */}
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                                No companies found.
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </div>

    );
};

export default FilteredJobs;
