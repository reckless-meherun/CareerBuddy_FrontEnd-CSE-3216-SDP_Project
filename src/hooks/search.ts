import { useState } from "react";
import { jobSearch } from "../api/searchApi";

export const useSearchJobs = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchJobs = async (criteria: Record<string, any>) => {
        setLoading(true);
        setError(null);

        try {
            const response = await jobSearch(criteria);
            return response;
        } catch (err) {
            setError('error fetching jobs');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, searchJobs };
};


