import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/CSEDU_Logo.png";

const JobPost = ({ post }: { post: any }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/jobs/${post.id}`, { state: { post } });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:scale-105 duration-300">
      {/* Company Logo */}
      <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center shadow-sm mb-4">
        <img
          src={logo}
          alt={`${post.company} logo`}
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* Job Title & Company Info */}
      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
        {post.title}
      </h4>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
        {post.company}
      </p>

      {/* Job Info */}
      <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span className="flex items-center gap-1">
          📍 <span>{post.location}</span>
        </span>
        <span className="flex items-center gap-1">
          💰 <span>{post.salary}</span>
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        {post.description}
      </p>
      {/* Required Skills */}
      {(post.existingSkills?.length()>0 || post.newSkills?.length>0) &&
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
        </div>}

      {/* Button Group */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleViewDetails}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
        >
          View Details
        </button>
        <button className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-md">
          Save for Later
        </button>
      </div>
    </div>
  );
};

export default JobPost;
