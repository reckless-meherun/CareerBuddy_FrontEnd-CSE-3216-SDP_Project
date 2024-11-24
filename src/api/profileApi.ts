import apiClient from "./apiClient";

export const searchProfile = async (id: string) => {
    try {
        // Use template literals to dynamically insert the `id`
        const response = await apiClient.get(`/profile/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error during job search:", error);

        // Provide more detailed error handling and re-throw with a descriptive message
        throw new Error(
            error.response?.data?.message || "Failed to perform the job search"
        );
    }
};

export const createProfile = async (profileData: {
    user_id: string; // UUID in string format
    name?: string;
    bio?: string;
    email?: string;
    phoneNumber?: string;
    role?: string;
    adress?: string;
}) => {
    try {
        const response = await apiClient.post("/profile", profileData);
        return response.data; // This will be the ProfileDTO from the backend
    } catch (error) {
        console.error("Error creating or updating profile:", error);
        throw error;
    }
};
