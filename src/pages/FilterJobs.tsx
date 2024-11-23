import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar'; 
import JobPost from '../components/JobPost';

const FilteredJobs = () => {
    const location = useLocation();
    const { results, criteria } = location.state || {}; // Retrieve results and criteria passed via navigation

    // State for filters (optional additional client-side filtering)
    const [filters, setFilters] = useState({
        location: '',
        industry: '',
        salary: ''
    });

    // Use passed results or fallback to the default example data
    const jobPosts = results || [
        { id: 1, title: 'Software Engineer', company: 'TechCorp', location: 'New York', industry: 'Technology', salary: '60k - 80k', description: 'Build software solutions.' },
        { id: 2, title: 'Data Scientist', company: 'DataInc', location: 'San Francisco', industry: 'Technology', salary: '80k - 100k', description: 'Analyze data and build models.' },
        // Add your existing job posts here
    ];

    // Apply additional filtering based on the sidebar filters
    const filteredPosts = jobPosts.filter(post =>
        (filters.location ? post.location === filters.location : true) &&
        (filters.industry ? post.industry === filters.industry : true) &&
        (filters.salary ? post.salary === filters.salary : true)
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <div className="flex">
                {/* Sidebar for Filters */}
                <FilterSidebar filters={filters} setFilters={setFilters} />

                {/* Main content area to display job posts */}
                <div className="w-full md:w-3/4 p-8">
                    <h2 className="text-3xl font-bold mb-6">Filtered Job Posts</h2>

                    {/* Show search criteria if available */}
                    {criteria && (
                        <div className="mb-6 p-4 rounded-lg bg-white dark:bg-gray-700 shadow">
                            <h3 className="text-lg font-semibold">Search Criteria</h3>
                            <p><strong>Job Title:</strong> {criteria.jobTitle || "Any"}</p>
                            <p><strong>Location:</strong> {criteria.location || "Any"}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map(post => <JobPost key={post.id} post={post} />)
                        ) : (
                            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">No job posts match the selected filters.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilteredJobs;
