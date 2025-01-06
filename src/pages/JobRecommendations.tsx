import JobPost from "@/components/JobPost";
import { useSearchJobs } from "@/hooks/search";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const JobRecommendations = () => {
//   const location = useLocation();
//   const { showRecommendations: initialShowRecommendations } = location.state || {};
//   const [showRecommendations, setShowRecommendations] = useState(
//     initialShowRecommendations || false
//   );
    const{profileId} = useParams();
  const { useGetRecommendation } = useSearchJobs();
  const [jobPosts, setJobPosts] = useState<Array<any>>([]);
  const [isRecommendation, setIsRecommendation] = useState(false);

  const fetchResults = async () => {
    try {
        if(!profileId){
            setIsRecommendation(false);
            return;
        }
        console.log(profileId)
      const response = await useGetRecommendation(profileId);
      setJobPosts(response);
    } catch (e) {
      console.error("Error fetching search results:", e);
    }
  };

  useEffect(() => {
    if ( !isRecommendation) {
        setIsRecommendation(true);
      fetchResults();
      
    }
  }, [ isRecommendation,profileId]);

  return (
    <div className="container mx-auto px-6 py-12">

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
            Job Recommendations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  }}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No job post recommendations for you! ☹️
              </p>
            )}
          </div>
        </div>
    </div>
  );
};

export default JobRecommendations;
