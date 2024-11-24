import { useState } from "react";
import { submitJobPost } from "../api/jobPostApi";



export const useJobPost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const handleJobPost = async (jobData: any) => {
        setLoading(true);
        setError(null);
        try {
            const data = await submitJobPost(jobData);
            setSuccess(true);
            return data;
        } catch (err) {
            setError('Error adding job post');
        } finally {
            setLoading(false);
        }
    }

    return { handleJobPost, loading, error,success };

}