import { useState } from "react";
import { addCompany, fetchCompanies } from "../api/companyApi"; // Adjust the import path as needed

const useCompany = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCompany = async (companyData: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await addCompany(companyData);
      return data; // Return the data if needed
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const getCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCompanies();
      return data; // Return the data if needed
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }


  return { handleAddCompany, loading, error ,getCompanies};
};

export default useCompany;
