import React from 'react';

const JobPost = ({ post }: { post: any }) => {
    return (
        <div className="bg-gray-300 dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{post.title}</h4>
            <p className="text-gray-600 dark:text-gray-300">{post.company}</p>
            <p className="text-gray-600 dark:text-gray-300">{post.location} | {post.salary}</p>
            <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
            <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Apply Now
            </button>
        </div>
    );
};

export default JobPost;
