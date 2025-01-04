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
