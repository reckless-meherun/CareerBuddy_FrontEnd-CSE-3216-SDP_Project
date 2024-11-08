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
        { id: 4, title: 'UX Designer', company: 'DesignFlow', location: 'Remote', industry: 'Design', salary: '70k - 90k', description: 'Design user-friendly interfaces.' },
        { id: 5, title: 'Marketing Specialist', company: 'MarketPro', location: 'Chicago', industry: 'Marketing', salary: '50k - 70k', description: 'Develop marketing strategies.' },
        { id: 6, title: 'Fullstack Developer', company: 'DevHub', location: 'Austin', industry: 'Technology', salary: '75k - 95k', description: 'Build and maintain full-stack applications.' },
        { id: 7, title: 'Sales Executive', company: 'SalesCorp', location: 'Los Angeles', industry: 'Sales', salary: '60k - 80k', description: 'Drive sales and manage client relationships.' },
        { id: 8, title: 'HR Manager', company: 'PeopleFirst', location: 'Seattle', industry: 'Human Resources', salary: '85k - 105k', description: 'Oversee recruitment and employee relations.' },
        { id: 9, title: 'Front-End Developer', company: 'WebDesigners', location: 'Remote', industry: 'Technology', salary: '65k - 85k', description: 'Build and style responsive websites.' },
        { id: 10, title: 'Project Manager', company: 'PM Solutions', location: 'Miami', industry: 'Project Management', salary: '95k - 115k', description: 'Manage and deliver projects on time.' },
        { id: 11, title: 'DevOps Engineer', company: 'CloudTech', location: 'San Jose', industry: 'Technology', salary: '100k - 120k', description: 'Manage cloud infrastructure and deployment pipelines.' },
        { id: 12, title: 'Software Architect', company: 'TechBuild', location: 'New York', industry: 'Technology', salary: '120k - 150k', description: 'Design and develop high-level software architectures.' }
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
