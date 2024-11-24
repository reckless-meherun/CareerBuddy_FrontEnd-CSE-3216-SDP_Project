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
  } catch (err:any) {
    console.error("Error adding company:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch company");
  }
};