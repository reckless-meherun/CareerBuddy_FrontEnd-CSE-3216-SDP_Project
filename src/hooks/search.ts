import { useState } from "react";
import { jobSearch, getRecommendation } from "../api/searchApi";
import { useNavigate } from "react-router-dom";

type Middleware = (next: Function) => (args: any) => Promise<any>;

export const useSearchJobs = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Middleware to handle loading state
    const loadingMiddleware: Middleware = (next) => async (args) => {
        setLoading(true);
        setError(null);
        try {
            return await next(args);
        } catch (err) {
            throw err; // Re-throw error for subsequent middlewares
        } finally {
            setLoading(false);
        }
    };

    // Middleware to handle errors
    const errorMiddleware: Middleware = (next) => async (args) => {
        try {
            return await next(args);
        } catch (err) {
            setError("An error occurred while processing the request.");
            console.error(err); // Log the error for debugging purposes
            throw err; // Re-throw to propagate if needed
        }
    };

    // Core logic to search jobs
    const executeJobSearch = async (criteria: Record<string, any>) => {
        return await jobSearch(criteria);
    };

    // Core logic to get recommendations
    const executeGetRecommendation = async (profileId: string) => {
        return await getRecommendation(profileId);
    };

    // Combine middlewares into a single pipeline
    const applyMiddlewares = (middlewares: Middleware[], coreFunction: Function) => {
        return middlewares.reduceRight(
            (acc, middleware) => middleware(acc),
            coreFunction
        );
    };

    // Pipeline for job search
    const searchJobs = applyMiddlewares(
        [loadingMiddleware, errorMiddleware],
        executeJobSearch
    );

    // Pipeline for fetching recommendations
    const useGetRecommendation = applyMiddlewares(
        [loadingMiddleware, errorMiddleware],
        executeGetRecommendation
    );

    return { loading, error, searchJobs, useGetRecommendation };
};
