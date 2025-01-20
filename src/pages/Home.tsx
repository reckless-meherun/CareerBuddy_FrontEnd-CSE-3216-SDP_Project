import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import myImage from '../assets/JobCover2.jpeg';
import qs from 'query-string';
import { useSearchJobs } from '../hooks/search';
import JobPost from '../components/JobPost';
import { useProfile } from "../hooks/profile";

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const {getProfile} = useProfile();
    const navigate = useNavigate();
    const { loading, error, useGetRecommendation } = useSearchJobs();
    const [jobPosts, setJobPosts] = useState<Array<any>>([]);
    const [isRecommendation, setIsRecommendation] = useState(false);

    const jobCategories = [
        { name: "Fullstack Developer", count: 1287, icon: "🖥️" },
        { name: "Cybersecurity Analyst", count: 612, icon: "🛡️" },
        { name: "ML Engineers", count: 212, icon: "🤖" },
        { name: "Graphics Designer", count: 972, icon: "🎨" },
        { name: "Research Scientist", count: 645, icon: "🔬" }
    ];
    useEffect(() => {

        if (!isRecommendation) {
            fetchResults();
            setIsRecommendation(true);
        }
        // console.log(jobPosts, "job")
    }, [isRecommendation, setIsRecommendation]);

    const fetchResults = async () => {

        try {
            const profile = await getProfile(); 
            const response = await useGetRecommendation(profile.id);
            // console.log(response);
            setJobPosts(response);
            // console.log("Job Posts:", jobPosts);

        } catch (e) {
            console.log('Error fetching search results:', e);
        }
    };


    // const jobRecommendations = [
    //     { title: "Senior Fullstack Developer", company: "Tech Corp", location: "New York, NY", salary: "$120k - $150k" },
    //     { title: "Cybersecurity Specialist", company: "SecureOps", location: "San Francisco, CA", salary: "$100k - $130k" },
    //     { title: "Machine Learning Engineer", company: "AI Innovators", location: "Remote", salary: "$110k - $140k" },
    //     { title: "Graphic Designer", company: "Creative Studio", location: "Austin, TX", salary: "$70k - $90k" },
    // ];

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const queryParams = qs.stringify({ jobTitle: searchTerm, location: location });
        navigate(`/filtered-jobs?${queryParams}`);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen text-gray-800 dark:text-gray-100 overflow-hidden">
            {/* Hero Section */}
            <div className="relative flex justify-center items-center bg-center w-full h-[600px] text-center overflow-hidden">
                <img src={myImage} alt="Job Interview" className="absolute w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 space-y-4 p-6">
                    <h1 className="font-bold text-2xl text-white sm:text-4xl">The Easiest Way to Get Your New Job</h1>
                    <p className="text-base text-white sm:text-lg">We offer 12,000 job vacancies right now</p>
                    <form onSubmit={handleSearch} className="flex sm:flex-row flex-col justify-center items-center sm:space-x-2 space-y-2 sm:space-y-0 px-4 sm:px-0 rounded-lg w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Job Keyword"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="dark:border-gray-900 dark:bg-gray-700 p-3 border rounded-lg w-full sm:w-72 dark:text-gray-100 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="dark:border-gray-900 dark:bg-gray-700 p-3 border rounded-lg w-full sm:w-72 dark:text-gray-100 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-teal-100 hover:bg-[#558b88] dark:hover:bg-lightGrey dark:bg-gray-800 px-6 py-3 rounded-lg w-full sm:w-auto text-black dark:text-white focus:outline-none"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Job Categories Section */}
            <div className="mx-auto mr-5 px-6 py-12 container">
                <h2 className="mb-6 font-semibold text-center text-xl sm:text-2xl">Browse Jobs by Category</h2>
                <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                    {jobCategories.map((category, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-white dark:bg-gray-700 shadow-md hover:shadow-lg p-4 rounded-lg text-center transition-shadow duration-200 cursor-pointer"
                        >
                            <div className="text-4xl">{category.icon}</div>
                            <h3 className="mt-2 font-medium text-lg">{category.name}</h3>
                            <p className="text-gray-500 text-sm dark:text-gray-400">({category.count} jobs)</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Job Recommendations Section */}
            <div className="mx-auto px-6 py-12 container">
                <h2 className="mb-6 font-semibold text-center text-xl sm:text-2xl">Job Recommendations</h2>
                <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {jobPosts.length > 0 ? (
                        jobPosts.map((post) => (
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
                            No job posts reccomendations for you! ☹️.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
