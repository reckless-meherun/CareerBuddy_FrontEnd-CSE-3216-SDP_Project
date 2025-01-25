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
export const searchskills = async (id: string) => {
    try {
        // Use template literals to dynamically insert the `id`
        const response = await apiClient.get(`/profile/skills/${id}`);
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
    address?: string;
    readySkills?: { id: string; name: string }[]; // Array of SkillDTO objects
    newSkills?: { name: string }[]; // Array of SkillRequest objects
    experiences?: any;
    educations?: any;
    }) => {
        try {
            // Use a template literal to insert the user_id
            const response = await apiClient.post(`/profile/${profileData.user_id}`, profileData);
            return response.data; // This will be the ProfileDTO from the backend
        } catch (error) {
            console.error("Error creating or updating profile:", error);
            throw error;
        }
    };

export const getskills = async ()=> {
    try {
        const response = await apiClient.get('/skill/all');
        return response.data;
    } catch (error:any) {
        console.error("Error fetching skills:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch skills");
    }
}

export const updateProfile = async (profileData: {
    user_id: string; // UUID in string format
    name?: string;
    bio?: string;
    email?: string;
    phoneNumber?: string;
    role?: string;
    address?: string;
    readySkills?: { id: string; name: string }[]; // Array of SkillDTO objects
    newSkills?: { name: string }[]; // Array of SkillRequest objects
    experiences?: any;
    educations?: any;
    }) => {
        try {
            // Use a template literal to insert the user_id
            const response = await apiClient.put(`/profile/${profileData.user_id}`, profileData);
            return response.data; // This will be the ProfileDTO from the backend
        } catch (error) {
            console.error("Error creating or updating profile:", error);
            throw error;
        }
    };

    export const uploadProfileImage = async (userId:string, formData:FormData) => {
        try {
            const response = await apiClient.post(
                `/api/upload?userId=${userId}`, // Add userId as a query parameter
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Ensure the content type is set
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error uploading profile image:", error);
            throw new Error(error.response?.data?.message || "Failed to upload profile image");
        }   
    };
