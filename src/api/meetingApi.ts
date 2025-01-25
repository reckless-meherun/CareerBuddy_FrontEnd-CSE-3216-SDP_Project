import apiClient from "./apiClient";

export const getusermeetings = async (id: string) => {
    try {
        // Use template literals to dynamically insert the `id`
        const response = await apiClient.get(`/meeting/user/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error during job search:", error);

        // Provide more detailed error handling and re-throw with a descriptive message
        throw new Error(
            error.response?.data?.message || "Failed to perform the job search"
        );
    }
};
export const addmeeting = async(meetingData:any) => {
    try {
        // Use template literals to dynamically insert the `id`
        const response = await apiClient.post(`/meeting/create`,meetingData);
        return response.data;
    } catch(error: any) {
        console.error("Error during job search:", error);
    }
}   