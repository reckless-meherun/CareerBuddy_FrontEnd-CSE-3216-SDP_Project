import React from 'react';
import logo from '../assets/CSEDU_Logo.png'

const JobPost = ({ post }: { post: any }) => {
    return (
        <div className="bg-gray-300 dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">       
            {/* Company Logo on Top Left */}
            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                    src={logo} 
                    alt={`${post.company} logo`} 
                    className="w-full h-full object-cover" 
                />
            </div>     
            <h4 className="text-xl mt-4 font-semibold text-gray-800 dark:text-gray-200">{post.title}</h4>
            <p className="text-gray-600 dark:text-gray-300">{post.company}</p>
            <p className="text-gray-600 dark:text-gray-300">{post.location} | {post.salary}</p>
            <p className="text-gray-600 dark:text-gray-300">{post.description}</p>

            {/* Button Group */}
            <div className="mt-4 flex space-x-4">
                <button className="py-2 px-4 bg-lightGrey text-white rounded-lg hover:bg-darkGrey transition-colors">
                    Detail
                </button>
                <button className="py-2 px-4 bg-darkTeal text-white rounded-lg hover:bg-darkGrey transition-colors">
                    Save For Later
                </button>
            </div>
        </div>
    );
};

export default JobPost;