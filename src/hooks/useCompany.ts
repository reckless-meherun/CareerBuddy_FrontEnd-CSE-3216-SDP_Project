import { useState } from "react";
import { addCompany, fetchCompanies, fetchCompaniesbyUser, isSubscribed, subscribeToCompany, unSubscribe } from "../api/companyApi"; // Adjust the import path as needed
import UserStorage from "@/utilities/UserStorage"; // Adjust the path to your UserStorage utility
import { useNavigate, useLocation } from "react-router-dom";

const useCompany = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const user = UserStorage.getUser();
  const userId = user?.id; // Adjust based on your auth implementation
  // console.log(userId);

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
      // console.log(data);
      return data; // Return the data if needed

    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  const useGetCompaniesbyUser = async () => {
    setLoading(true);
    setError(null);
    try {

      if (!userId) {
        // Redirect to login if user is not authenticated
        navigate("/login", { state: { from: location.pathname } });
        return;
      }
      const data = await fetchCompaniesbyUser(userId);
      console.log("anmar matha", data);
      return data; // Return the data if needed
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  const useSubscribetoCompany = async (companyId: string) => {
    setLoading(true);
    setError(null);
    try {
      if (!userId) {
        // Redirect to login if user is not authenticated
        navigate("/login", { state: { from: location.pathname } });
        return;
      }
      
      // Implement logic to subscribe to a company
      const data = await subscribeToCompany(userId, companyId);
      return data; // Return true if subscription is successful
    } catch (error: any) {
      setError("Error subscribing to company");
      throw error;
    } finally {
      setLoading(false);
    }
  }
  const usegetSubscription = async (companyId: string) => {
    setLoading(true);
    setError(null);
    try {
      if (!userId) {
        // Redirect to login if user is not authenticated
        navigate("/login", { state: { from: location.pathname } });
        return;
      }
      
      // Implement logic to subscribe to a company
      const data = await isSubscribed(userId, companyId);
      return data; // Return true if subscription is successful
    } catch (error: any) {
      setError("Error subscribing to company");
      throw error;
    } finally {
      setLoading(false);
    }
  }
  const useUnsubscribe = async (companyId: string) => {
    setLoading(true);
    setError(null);
    try {
      if (!userId) {
        // Redirect to login if user is not authenticated
        navigate("/login", { state: { from: location.pathname } });
        return;
      }
      
      // Implement logic to subscribe to a company
      const data = await unSubscribe(userId, companyId);
      return data; // Return true if subscription is successful
    } catch (error: any) {
      setError("Error subscribing to company");
      throw error;
    } finally {
      setLoading(false);
    }
  }



    return { handleAddCompany, loading, error, getCompanies, useGetCompaniesbyUser,useSubscribetoCompany,usegetSubscription,useUnsubscribe };
  };

  export default useCompany;
