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
  Loader2
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
      <div className="flex h-screen items-center justify-center">
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
    if(successMessage){
        toast.success(successMessage);
      }else if(error){
        toast.error(error);
    }

    //   setSuccessMessage('Successfully applied for the job!');
      
      // Optional: Redirect after successful application
      // setTimeout(() => navigate('/my-applications'), 2000);
    
  
  };

  const JobDetail = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 rounded-lg bg-gray-100 dark:bg-gray-800 p-3 transition-all hover:shadow-md">
      <div className="rounded-full bg-gray-200 dark:bg-gray-700 p-2">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Status Messages */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/50 dark:text-red-200">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-900/50 dark:text-green-200">
            {successMessage}
          </div>
        )}

        {/* Header Card */}
        <div className="rounded-lg bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
            {/* Previous header content... */}
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 md:h-24 md:w-24">
                {post.logo ? (
                  <img
                    src={post.logo}
                    alt={`${post.company} logo`}
                    className="h-12 w-12 object-contain md:h-16 md:w-16"
                  />
                ) : (
                  <Building2 className="h-8 w-8 text-gray-600 dark:text-gray-300 md:h-12 md:w-12" />
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold md:text-2xl">{post.title}</h1>
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
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
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
          <JobDetail
            icon={Factory}
            label="Company"
            value={post.company}
          />
          <JobDetail
            icon={CalendarOff}
            label="Deadline"
            value={formatDate(post.deadline)}
          />
        </div>

        {/* Description Card */}
        <div className="rounded-lg bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Job Description</h2>
          <div className="text-gray-600 dark:text-gray-300">
            {post.description}
          </div>
          {(post.existingSkills?.length > 0 || post.newSkills?.length > 0) && (
            <div className="mt-4">
              <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Required Skills:
              </h5>
              <div className="flex flex-wrap gap-2">
                {post.existingSkills?.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg shadow-sm"
                  >
                    {skill.name}
                  </span>
                ))}
                {post.newSkills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-lg shadow-sm"
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