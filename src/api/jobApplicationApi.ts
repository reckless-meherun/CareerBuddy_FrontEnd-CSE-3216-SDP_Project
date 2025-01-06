import apiClient from "./apiClient";

export const applyForJobApi = async (jobId: string, userId: string): Promise<any> => {
  try {
    const response = await apiClient.post(
      `/jobApplication/apply/${jobId}`,
      null, // No body required
      {
        params: { userId },
      }
    );
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Failed to apply for the job."
    );
  }
};
export const getAppliedJobs = async (userId: string): Promise<any> => {
  try {
    const response = await apiClient.get(
      `/jobApplication/user/${userId}`,
    );
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Failed to apply for the job."
    );
  }
};

export const getJobApplications = async (jobId: string): Promise<any> => {
  try {
    const response = await apiClient.get(`/jobApplication/job/${jobId}`);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch job applications."
    );
  }
};

export const updateJobApplications = async (ApplitionId: string,status:string)=>{
  const update ={
    status: status,
  }
  try {
    const response = await apiClient.put(`/jobApplication/update/${ApplitionId}`,update);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Failed to update job applications."
    );
  }
}