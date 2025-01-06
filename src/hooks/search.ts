import { useState } from "react";
import { jobSearch, getRecommendation } from "../api/searchApi";
import UserStorage from "@/utilities/UserStorage"; // Adjust the path to your UserStorage utility
import { useNavigate, useLocation } from "react-router-dom";

export const useSearchJobs = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const searchJobs = async (criteria: Record<string, any>) => {
        setLoading(true);
        setError(null);

        try {
            const response = await jobSearch(criteria);
            // console.log(response);
            return response;
        } catch (err) {
            setError('error fetching jobs');
        } finally {
            setLoading(false);
        }
    };
    const useGetRecommendation = async (profileId:string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getRecommendation(profileId);
            // console.log(response);
            return response;
        } catch (err) {
            setError('error fetching jobs');
        } finally {
            setLoading(false);
        }
    };


    return { loading, error, searchJobs,useGetRecommendation };
};


