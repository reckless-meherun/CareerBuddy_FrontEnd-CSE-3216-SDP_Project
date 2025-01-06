import apiClient from "./apiClient";

export const jobSearch = async (criteria: Record<string, any>)=>{
    try {
            const response = await apiClient.post('/search', 
                criteria
            );
            return response.data;

    }
    catch (error:any) {
        console.error("Error searching job",error);
        throw new Error(error.response?.data?.message || 'Failed to search job');

    }
};

export const getRecommendation = async (id: string) => {
    try {
        // Use template literals to dynamically insert the `id`
        const response = await apiClient.get(`/profile/recommendation/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        console.error("Error during job search:", error);

        // Provide more detailed error handling and re-throw with a descriptive message
        throw new Error(
            error.response?.data?.message || "Failed to perform the job search"
        );
    }
};

