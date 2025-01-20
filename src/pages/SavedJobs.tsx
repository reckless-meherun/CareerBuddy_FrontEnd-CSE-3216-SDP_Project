import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import JobPost from '../components/JobPost';
import qs from 'query-string';
import { useSearchJobs } from '../hooks/search';
import useCompany from '@/hooks/useCompany';
import { toast } from 'react-toastify';
import CompanyCard from '@/components/companyCard';
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

type Company = {
    id: string;
    companyName: string;
    active: boolean;
    location?: string;
    website?: string;
    phoneNumber?: string;
    email?: string;
    size?: string;
    foundationYear?: string | Date;
    domain?: string;
    description?: string;
  };
  

const SavedJobs = () => {
    const jobLocation = useLocation();
    const { jobTitle, location } = qs.parse(jobLocation.search); // Extract query parameters
    const { loading, error, searchJobs } = useSearchJobs();
    // const navigate = useNavigate(); // Initialize useNavigate
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {useSubscribetoCompany,usegetSubscription,useUnsubscribe} = useCompany();
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
        // console.log(jobPosts, "job")
    }, [jobTitle, location]);

    const fetchResults = async () => {
        try {
            const response = await searchJobs({ jobTitle, location });
            // console.log(response);

            // Safely extract jobs and companies from the response
            const jobs = response.jobs;
            const gotcompanies = response.companies;

            // Set the state for job posts and companies
            setJobPosts(jobs);
            setCompanies(gotcompanies);

            // console.log("Response Jobs:", jobs);
            // console.log("Response Companies:", gotcompanies);
            // console.log("Job Posts:", jobPosts);
            // console.log(companies)
        } catch (e) {
            console.log('Error fetching search results:', e);
        }
    };
    // useEffect(() => {
    //     console.log("Updated Job Posts:", jobPosts);
    // }, [jobPosts]);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleSubscription = (company:any)=>{
        console.log(company.id);
        if(!company.id){
            toast.error("Company not found");
            return;
        }
        const response = useSubscribetoCompany(company.id);
        console.log(response);
        toast.success("Sucessfully subscribed to company", company.companyName)
        // navigate(`/company/${company.id}`); // Navigate to company page

    }
    const handleUnSubscription = (company:Company)=>{
        console.log(company.id);
        if(!company.id){
            toast.error("Company not found");
            return;
        }
        const response = useUnsubscribe(company.id);
        console.log(response);
        toast.success("Sucessfully Unsubscribed to company "+company.companyName)
        // navigate(`/company/${company.id}`); // Navigate to company page

    }


    // Apply additional filtering based on sidebar filters
    const filteredPosts = jobPosts.filter(post =>
        (filters.location ? post.location === filters.location : true) &&
        (filters.industry ? post.company.domain === filters.industry : true) &&
        (filters.salary ? post.salary === parseInt(filters.salary) : true)
    );

    return (
        <div className="bg-gradient-to-b from-gray-100 dark:from-gray-800 to-gray-200 dark:to-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <FilterSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="z-40 fixed inset-0 md:hidden bg-black opacity-50"
                        onClick={toggleSidebar}
                    ></div>
                )}


                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="z-40 fixed inset-0 md:hidden bg-black opacity-50"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-8">
                    {/* Hamburger Menu */}
                    <button
                        className="md:hidden bg-blue-500 mb-4 px-4 py-2 rounded-lg text-white"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ☰
                    </button>

                    {/* Header */}
                    <header className="mb-6">
                        <h2 className="mb-2 font-bold text-3xl text-center md:text-left tracking-wide">
                            Saved Job Posts
                        </h2>
                        <p className="text-center text-gray-600 md:text-left dark:text-gray-400">
                            Explore jobs and companies of your priority.
                        </p>
                    </header>

                    {/* Tabs */}
                    <div className="flex justify-center md:justify-start border-gray-300 dark:border-gray-700 mb-6 border-b">
                        {/* <button
                            onClick={() => setActiveTab("jobs")}
                            className={`px-4 py-2 text-lg font-semibold focus:outline-none transition ${activeTab === "jobs"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
                                }`}
                        >
                            Jobs
                        </button> */}
                        {/* <button
                            onClick={() => setActiveTab("companies")}
                            className={`ml-4 px-4 py-2 text-lg font-semibold focus:outline-none transition ${activeTab === "companies"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
                                }`}
                        >
                            Companies
                        </button> */}
                    </div>

                    {/* Content */}
                    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                                            deadline: post.deadline,
                                            jobType: post.jobType,
                                            experience: post.experience,
                                            contact:post.company.phoneNumber,
                                            email: post.company.email,
                                        }}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                                    No job posts match the selected filters.
                                </p>
                            )
                        ) : companies.length > 0 ? (
                            companies.map((company:Company) => (
                              <CompanyCard
                                key={company.id}
                                company={company}
                                handleSubscription={handleSubscription}
                                handleUnsubscription={handleUnSubscription}
                                fetchSubscriptionStatus={usegetSubscription}
                              />
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

export default SavedJobs;
