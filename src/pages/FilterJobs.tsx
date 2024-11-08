import React, { useState } from 'react';
import FilterSidebar from '../components/FilterSidebar'; 
import JobPost from '../components/JobPost';

const FilteredJobs = () => {
    const [filters, setFilters] = useState({
        location: '',
        industry: '',
        salary: ''
    });

    // Example data for job posts
    const jobPosts = [
        { id: 1, title: 'Software Engineer', company: 'TechCorp', location: 'New York', industry: 'Technology', salary: '60k - 80k', description: 'Build software solutions.' },
        { id: 2, title: 'Data Scientist', company: 'DataInc', location: 'San Francisco', industry: 'Technology', salary: '80k - 100k', description: 'Analyze data and build models.' },
        { id: 3, title: 'Product Manager', company: 'InnovateX', location: 'Boston', industry: 'Product Management', salary: '90k - 110k', description: 'Lead product teams.' },
    ];

    // Filter the job posts based on selected filters
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map(post => (
                            <JobPost key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilteredJobs;
