import apiClient from "./apiClient"; // Adjust the import path as needed

export const addCompany = async (companyData: any) => {
  try {
    const response = await apiClient.post("/company", companyData);
    return response.data; // Assuming the API returns some data on success
  } catch (error: any) {
    console.error("Error adding company:", error);
    throw new Error(error.response?.data?.message || "Failed to add company");
  }
};

export const fetchCompanies = async () => {
  try {
    const response = await apiClient.get("/company");
    return response.data;
  } catch (err: any) {
    console.error("Error adding company:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch company");
  }
};
export const fetchCompaniesbyUser = async (userId: string) => {
  try {
    const response = await apiClient.get(`/company/allbyuser/${userId}`);
    return response.data;
  } catch (err: any) {
    console.error("Error adding company:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch company");
  }
};
export const subscribeToCompany = async (userId: string, companyId: string) => {
  try {
    console.log("User ID:", userId, "Company ID:", companyId); // Debug log to verify the data being sent

    const response = await apiClient.post(
      "/subscribe/",
      null, // No data in the request body for query parameters
      {
        params: {
          userId: userId,
          companyId: companyId,
        },
      }
    );

    return response.data;
  } catch (err: any) {
    console.error("Error subscribing to company:", err);
    throw new Error(err.response?.data?.message || "Failed to subscribe to company");
  }
};
export const isSubscribed = async (userId: string, companyId: string) => {
  try {
    console.log("User ID:", userId, "Company ID:", companyId); // Debug log to verify the data being sent

    const response = await apiClient.get(
      "/subscribe/isSubscribed", // No data in the request body for query parameters
      {
        params: {
          userId: userId,
          companyId: companyId,
        },
      }
    );

    return response.data;
  } catch (err: any) {
    console.error("Error subscribing to company:", err);
    throw new Error(err.response?.data?.message || "Failed to subscribe to company");
  }
};
export const unSubscribe = async (userId: string, companyId: string) => {
  try {
    console.log("User ID:", userId, "Company ID:", companyId); // Debug log to verify the data being sent

    const response = await apiClient.delete(
      "/subscribe/", // No data in the request body for query parameters
      {
        params: {
          userId: userId,
          companyId: companyId,
        },
      }
    );

    return response.data;
  } catch (err: any) {
    console.error("Error subscribing to company:", err);
    throw new Error(err.response?.data?.message || "Failed to subscribe to company");
  }
};

export const getSubscribedCompanies = async (userId: string) => {
  try {
    const response = await apiClient.get(`/subscribe/user/${userId}`);
    return response.data;
  } catch (err: any) {
    console.error("Error adding company:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch company");
  }
}
