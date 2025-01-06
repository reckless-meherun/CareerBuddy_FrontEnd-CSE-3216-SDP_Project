import apiClient from "./apiClient";


export const submitJobPost = async (jobData: any
    // {
    // companyId: string;
    // title: string;
    // description: string;
    // location: string;
    // experience: number;
    // jobType: string;
    // deadline: string;
    // salary: number;}
) => {

    try {
        const response = await apiClient.post("/job", jobData);
        return response.data;
    } catch (err: any) {
        console.error("Error adding company:", err);
        throw new Error(err.response?.data?.message || "Failed to post job post");
    }
};

export const getJObPosts = async (companyId: string
) => {

    try {
        const response = await apiClient.get(`/job/company/${companyId}`);
        return response.data;
    } catch (err: any) {
        console.error("Error adding company:", err);
        throw new Error(err.response?.data?.message || "Failed to post job post");
    }
};
export const getJObPost = async (jobId: string
) => {

    try {
        const response = await apiClient.get(`/job/${jobId}`);
        return response.data;
    } catch (err: any) {
        console.error("Error adding company:", err);
        throw new Error(err.response?.data?.message || "Failed to post job post");
    }
};
