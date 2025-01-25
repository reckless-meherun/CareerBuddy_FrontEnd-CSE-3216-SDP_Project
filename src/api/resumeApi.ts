import apiClient from "./apiClient";

export const getUserResumes = async (profileId: string) => {
    try {
        const response = await apiClient.get(`/resume/profile/${profileId}`,
        );
        return response.data;

    }
    catch (error: any) {
        console.error("Error fetching resumes", error);
        throw new Error(error.response?.data?.message || 'Failed to fetch resumes');

    }
};

export const createResume = async (profileId: string, resumeData: any) => {
    try {
        const response = await apiClient.post(`/resume/create/${profileId}`,
            resumeData
        );
        return response.data;

    }
    catch (error: any) {
        console.error("Error fetching resumes", error);
        throw new Error(error.response?.data?.message || 'Failed to fetch resumes');

    }
};

export const getResume = async (resumeId: string) => {
    try {
        const response = await apiClient.get(`/resume/byid/${resumeId}`,
        );
        return response.data;
    }
    catch (error: any) {
        console.error("Error fetching resumes", error);
        throw new Error(error.response?.data?.message || 'Failed to fetch resumes');
    }
};

export const updateResume = async (id: string, resumeData: any) => {
    console.log(resumeData, "ki pass hoy11");
    try {
        const response = await apiClient.put(`/resume/update/${id}`,
            resumeData,

        );
        return response.data;
    }
    catch (error: any) {
        console.error("Error fetching resumes", error);
        throw new Error(error.response?.data?.message || 'Failed to fetch resumes');
    }
};
export const updateEducation = async (id: string, resumeData: any) => {
    console.log(resumeData, "ki pass hoy11");
    try {
        const response = await apiClient.put(`/profile/addEducation/${id}`,
            resumeData,

        );
        return response.data;
    }
    catch (error: any) {
        console.error("Error updating resumes", error);
        throw new Error(error.response?.data?.message || 'Failed to update resumes');
    }
};
export const updateExperience = async (id: string, resumeData: any) => {
    console.log(resumeData, "ki pass hoy11");
    try {
        const response = await apiClient.put(`/profile/addExperience/${id}`,
            resumeData,

        );
        return response.data;
    }
    catch (error: any) {
        console.error("Error updating resumes", error);
        throw new Error(error.response?.data?.message || 'Failed to update resumes');
    }
};
export const updateResuemState = async (id: string) => {
    try {
        const response = await apiClient.post(`/resume/modified/${id}`,
        );
        return response.data;
    }
    catch (error: any) {
        console.error("Error updating resume status", error);
        throw new Error(error.response?.data?.message || 'Failed to update resume status');
    }
};
export const finaliseResume = async (id: string) => {
    try {
        console.log(id, 'in side api')
        const response = await apiClient.post(`/resume/finalise/${id}`,
        );
        return response.data;
    }
    catch (error: any) {
        console.error("Error finalising resumes", error);
        throw new Error(error.response?.data?.message || 'Failed to finalise resumes');
    }
};
export const rejectResume = async (id: string) => {
    try {
        const response = await apiClient.post(`/resume/reject/${id}`,
        );
        return response.data;
    }
    catch (error: any) {
        console.error("Error rejecting resumes", error);
        throw new Error(error.response?.data?.message || 'Failed to reject resumes');
    }
};
