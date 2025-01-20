import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CalendarOff,
  Factory,
  HandCoins,
  MapPinned,
  PersonStanding,
  Users,
  Building2,
  BriefcaseBusiness,
  Loader2,
  Contact,
  PhoneCall,
  Mail
} from 'lucide-react';
import UserStorage from "@/utilities/UserStorage";
import useApplyForJob from "../hooks/useApplyForJob";
import { toast } from 'react-toastify';

const DetailJobPostPreview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const post = state?.post;
  const { isLoading, error, successMessage, applyForJob } = useApplyForJob();

  // Add states for API handling
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState(null);
  //   const [successMessage, setSuccessMessage] = useState('');

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">Job post not found.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleApply = async () => {

    await applyForJob(post.id);
    if (successMessage) {
      toast.success(successMessage);
    } else if (error) {
      toast.error(error);
    }

    //   setSuccessMessage('Successfully applied for the job!');

    // Optional: Redirect after successful application
    // setTimeout(() => navigate('/my-applications'), 2000);


  };

  const JobDetail = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 hover:shadow-md p-3 rounded-lg transition-all">
      <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm dark:text-gray-400">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-8 min-h-screen">
      <div className="space-y-6 mx-auto max-w-5xl">
        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 p-4 rounded-lg text-red-700 dark:text-red-200">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg text-green-700 dark:text-green-200">
            {successMessage}
          </div>
        )}

        {/* Header Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-6 p-6">
            {/* Previous header content... */}
            <div className="flex items-center gap-6">
              <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-xl w-16 md:w-24 h-16 md:h-24">
                {post.logo ? (
                  <img
                    src={post.logo}
                    alt={`${post.company} logo`}
                    className="w-12 md:w-16 h-12 md:h-16 object-contain"
                  />
                ) : (
                  <Building2 className="w-8 md:w-12 h-8 md:h-12 text-gray-600 dark:text-gray-300" />
                )}
              </div>
              <div>
                <h1 className="font-bold text-2xl md:text-3xl">{post.title}</h1>
                <h2 className='font-bold text-xl md:text-2xl'>{post.company}</h2>
              </div>
            </div>
            <button
              onClick={handleApply}
              disabled={isLoading}
              className={`rounded-lg px-6 py-2 text-white transition-colors duration-200 w-full md:w-auto
                ${isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {isLoading ? (
                <span className="flex justify-center items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Applying...
                </span>
              ) : (
                'Apply Now'
              )}
            </button>
          </div>
        </div>

        {/* Rest of your existing components... */}
        {/* Job Details Grid */}
        <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <JobDetail
            icon={HandCoins}
            label="Salary"
            value={post.salary}
          />
          <JobDetail
            icon={PersonStanding}
            label="Job Type"
            value={post.jobType}
          />
          <JobDetail
            icon={MapPinned}
            label="Location"
            value={post.location}
          />
          {/* <JobDetail
            icon={Users}
            label="Vacancies"
            value={post.vacancies}
          /> */}
          <JobDetail
            icon={BriefcaseBusiness}
            label="Experience"
            value={post.experience + " Years"}
          />
          <div className="flex flex-col gap-5 bg-gray-100 dark:bg-gray-800 hover:shadow-md p-3 rounded-lg transition-all">
            <div className='flex flex-row items-center gap-3'>
              <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm dark:text-gray-400">Phone</span>
                <span className="font-medium">{post.contact}</span>
              </div>
            </div>
            <div className='flex flex-row items-center gap-3'>
              <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm dark:text-gray-400">Email</span>
                <span className="font-medium break-all leading-relaxed">{post.email}</span>

                
              </div>
            </div>
          </div>
          <JobDetail
            icon={CalendarOff}
            label="Deadline"
            value={formatDate(post.deadline)}
          />
        </div>

        {/* Description Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
          <h2 className="mb-4 font-bold text-xl">Job Description</h2>
          <div className="text-gray-600 dark:text-gray-300">
            {post.description}
          </div>
          {(post.existingSkills?.length > 0 || post.newSkills?.length > 0) && (
            <div className="mt-4">
              <h5 className="mb-2 font-semibold text-gray-800 text-lg dark:text-gray-200">
                Required Skills:
              </h5>
              <div className="flex flex-wrap gap-2">
                {post.existingSkills?.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-blue-100 shadow-sm px-3 py-1 rounded-lg font-medium text-blue-700 text-xs"
                  >
                    {skill.name}
                  </span>
                ))}
                {post.newSkills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-100 shadow-sm px-3 py-1 rounded-lg font-medium text-green-700 text-xs"
                  >
                    {typeof skill === "object" ? skill.name : skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailJobPostPreview;