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