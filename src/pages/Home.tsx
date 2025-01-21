import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from 'query-string';
import { useSearchJobs } from '../hooks/search';
import JobPost from '../components/JobPost';
import { useProfile } from "../hooks/profile";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import firstImage from '../assets/job1.jpg';
import secondImage from '../assets/job2.jpg';
import thirdImage from '../assets/job3.png';

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const { getProfile } = useProfile();
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

    const carouselImages = [
        { src: firstImage, alt: "Find your dream job" },
        { src: secondImage, alt: "Explore career opportunities" },
        { src: thirdImage, alt: "Connect with top companies" },
    ];

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: 'linear',
        arrows: false,
    };

    useEffect(() => {
        if (!isRecommendation) {
            fetchResults();
            setIsRecommendation(true);
        }
    }, [isRecommendation, setIsRecommendation]);

    const fetchResults = async () => {
        try {
            const profile = await getProfile();
            const response = await useGetRecommendation(profile.id);
            setJobPosts(response);
        } catch (e) {
            console.log('Error fetching search results:', e);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const queryParams = qs.stringify({ jobTitle: searchTerm, location: location });
        navigate(`/filtered-jobs?${queryParams}`);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen text-gray-800 dark:text-gray-100 overflow-hidden">
            {/* Hero Section with Carousel */}
            <div className="relative h-[600px]">
                {/* Carousel */}
                <div className="absolute inset-0">
                    <Slider {...sliderSettings}>
                        {carouselImages.map((image, index) => (
                            <div key={index} className="relative w-full h-[600px]">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black opacity-50"></div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Search Content */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center space-y-4 p-6">
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
                            className="px-6 py-4 text-white bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Job Categories Section */}
            <div className="mx-auto px-6 py-16 container">
                <h2 className="mb-12 font-bold text-center text-3xl sm:text-4xl">
                    <span className="bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                        Explore Job Categories
                    </span>
                </h2>
                <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                    {jobCategories.map((category, index) => (
                        <div
                            key={index}
                            className="group relative transform transition-all duration-300 hover:scale-105"
                        >
                            {/* Card Container */}
                            <div className={`
                                relative overflow-hidden rounded-2xl p-6
                                bg-gradient-to-br ${category.lightGradient} ${category.darkGradient}
                                border border-transparent hover:border-opacity-50 ${category.lightBorder} ${category.darkBorder}
                                hover:shadow-2xl transition-all duration-300
                                flex flex-col items-center
                                min-h-[240px] cursor-pointer
                                backdrop-blur-sm
                            `}>
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                                
                                {/* Icon Container */}
                                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
                                    <div className="text-6xl bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-20 p-4 rounded-2xl backdrop-blur-sm">
                                        {category.icon}
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className={`text-center z-10 ${category.lightText} ${category.darkText}`}>
                                    <h3 className="font-bold text-xl mb-2 transform transition-all duration-300 group-hover:scale-105">
                                        {category.name}
                                    </h3>
                                    <p className="opacity-80 font-medium">
                                        {category.count.toLocaleString()} jobs
                                    </p>
                                </div>

                                {/* Hover Effect Overlay */}
                                <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                                
                                {/* Bottom Decoration */}
                                <div className={`
                                    absolute bottom-0 left-0 right-0 h-1 
                                    bg-gradient-to-r ${category.lightGradient} ${category.darkGradient} 
                                    opacity-50 transform scale-x-0 group-hover:scale-x-100 
                                    transition-transform duration-300
                                `}></div>
                            </div>
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
                                    contact: post.company.phoneNumber,
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