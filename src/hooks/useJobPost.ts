import { useState } from "react";
import { submitJobPost, getJObPosts, getJObPost } from "../api/jobPostApi";



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

    const useGetJobPost = async (companyId:string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getJObPosts(companyId);
            return data;
        } catch (err) {
            setError('Error fetching job post');
        } finally {
            setLoading(false);
        }
    }
    const useGetJobPosts = async (jobId:string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getJObPost(jobId);
            return data;
        } catch (err) {
            setError('Error fetching job post');
        } finally {
            setLoading(false);
        }
    }


    return { handleJobPost,useGetJobPost,useGetJobPosts, loading, error,success };

}