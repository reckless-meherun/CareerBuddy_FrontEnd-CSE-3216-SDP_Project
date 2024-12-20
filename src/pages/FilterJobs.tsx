import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import JobPost from '../components/JobPost';
import qs from 'query-string';
import { useSearchJobs } from '../hooks/search';
import { Button } from '@/components/ui/button';

const FilteredJobs = () => {
    const jobLocation = useLocation();
    const { jobTitle, location } = qs.parse(jobLocation.search); // Extract query parameters
    const { loading, error, searchJobs } = useSearchJobs();
    const navigate = useNavigate(); // Initialize useNavigate

    // State to store fetched jobs and companies
    const [jobPosts, setJobPosts] = useState([]);
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
    }, [jobTitle, location]);

    const fetchResults = async () => {
        try {
            const response = await searchJobs({ jobTitle, location });
            console.log(response);
            setJobPosts(response.jobs || []); // Extract jobs from the response
            setCompanies(response.companies || []); // Extract companies from the response
        } catch (e) {
            console.error('Error fetching search results:', e);
        }
    };

    // Apply additional filtering based on sidebar filters
    const filteredPosts = jobPosts.filter(post =>
        (filters.location ? post.location === filters.location : true) &&
        (filters.industry ? post.company.domain === filters.industry : true) &&
        (filters.salary ? post.salary === parseInt(filters.salary) : true)
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <div className="flex">
                {/* Sidebar for Filters */}
                <FilterSidebar filters={filters} setFilters={setFilters} />

                {/* Main content area */}
                <div className="w-full md:w-3/4 p-8">
                    <h2 className="text-3xl font-bold mb-6">Filtered Results</h2>



                    {/* Tabs for Jobs and Companies */}
                    <div className="mb-6 flex border-b border-gray-300 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`px-4 py-2 text-lg font-semibold focus:outline-none ${activeTab === 'jobs'
                                ? 'border-b-2 border-blue-500 text-blue-500'
                                : 'text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            Jobs
                        </button>
                        <button
                            onClick={() => setActiveTab('companies')}
                            className={`px-4 py-2 text-lg font-semibold focus:outline-none ml-3 ${activeTab === 'companies'
                                ? 'border-b-2 border-blue-500 text-blue-500'
                                : 'text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            Companies
                        </button>
                    </div>
                    {/* Show search criteria if available */}
                    <div className="mb-6 p-4 rounded-lg bg-white dark:bg-gray-700 shadow">
                        <h3 className="text-lg font-semibold">Search Criteria</h3>
                        <p><strong>Job Title:</strong> {jobTitle || 'Any'}</p>
                        <p><strong>Location:</strong> {location || 'Any'}</p>
                    </div>

                    {/* Active Tab Content */}
                    {activeTab === 'jobs' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map(post => (
                                    <JobPost
                                        key={post.id}
                                        post={{
                                            id: post.id,
                                            title: post.title,
                                            company: post.company.companyName,
                                            location: post.location,
                                            salary: `${post.salary || 'Negotiable'}`,
                                            description: post.description,
                                        }}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                                    No job posts match the selected filters.
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {companies.length > 0 ? (
                                companies.map(company => (
                                    <div
                                        key={company.id}
                                        className="p-4 bg-white dark:bg-gray-700 shadow rounded-lg"
                                    >
                                        <h3 className="text-xl font-semibold">{company.companyName}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{company.location}</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                            {company.description || 'No description available.'}
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                                            <strong>Website:</strong> {company.website || 'N/A'}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                                    No companies found.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilteredJobs;
