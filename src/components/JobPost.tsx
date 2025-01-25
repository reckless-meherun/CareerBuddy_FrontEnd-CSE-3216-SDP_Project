import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/CSEDU_Logo.png";
import { useJobPost } from "@/hooks/useJobPost";
import { useProfile } from "@/hooks/profile";
import { toast } from "react-toastify";

const JobPost = ({ post, isSaved = false }: { post: any; isSaved?: boolean }) => {
  const navigate = useNavigate();
  const { useSaveJobPost, useDeleteSavedJobPosts } = useJobPost();
  const { getProfile } = useProfile();

  const [isVisible, setIsVisible] = useState(true); // State to manage visibility

  const handleViewDetails = () => {
    navigate(`/jobs/${post.id}`, { state: { post } });
  };

  const handleSavePost = async () => {
    try {
      const response = await getProfile();
      if (!isSaved) {
        await useSaveJobPost(post.id, response.id);
        toast.success("Job Saved Successfully");
      } else {
        await useDeleteSavedJobPosts(post.id, response.id);
        toast.success("Job Deleted Successfully");
        setIsVisible(false); // Hide the component after deletion
      }
    } catch (error) {
      toast.error("An error occurred while saving/deleting the job.");
    }
  };

  if (!isVisible) return null; // Do not render if not visible

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl p-6 rounded-lg transform transition-shadow duration-300 hover:scale-105">
      {/* Company Logo */}
      <div className="flex justify-center items-center bg-gray-100 shadow-sm mb-4 rounded-full w-14 h-14 overflow-hidden">
        <img
          src={logo}
          alt={`${post.company} logo`}
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* Job Title & Company Info */}
      <h4 className="mb-1 font-bold text-gray-900 text-xl dark:text-white">
        {post.title}
      </h4>
      <p className="mb-3 font-medium text-gray-600 text-sm dark:text-gray-300">
        {post.company}
      </p>

      {/* Job Info */}
      <div className="flex flex-wrap gap-2 mb-4 text-gray-500 text-sm dark:text-gray-400">
        <span className="flex items-center gap-1">
          📍 <span>{post.location}</span>
        </span>
        <span className="flex items-center gap-1">
          💰 <span>{post.salary}</span>
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 text-gray-700 text-sm dark:text-gray-300">
        {post.description}
      </p>

      {/* Required Skills */}
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

      {/* Button Group */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleViewDetails}
          className="bg-blue-600 hover:bg-blue-700 shadow-md px-4 py-2 rounded-lg font-semibold text-white transition-colors"
        >
          View Details
        </button>
        <button
          onClick={handleSavePost}
          className={`${
            isSaved ? "bg-red-500 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"
          } shadow-md px-4 py-2 rounded-lg font-semibold text-white transition-colors`}
        >
          {isSaved ? "Delete" : "Save for later"}
        </button>
      </div>
    </div>
  );
};

export default JobPost;
