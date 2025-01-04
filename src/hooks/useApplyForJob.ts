import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { applyForJobApi } from "../api/jobApplicationApi";
import UserStorage from "@/utilities/UserStorage"; // Adjust the path to your UserStorage utility

const useApplyForJob = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const applyForJob = async (jobId: string) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      // Get userId from localStorage or your auth context
      const user = UserStorage.getUser();
      const userId = user?.id; // Adjust based on your auth implementation

      if (!userId) {
        // Redirect to login if user is not authenticated
        navigate("/login", { state: { from: location.pathname } });
        return;
      }

      // Call the API function
      await applyForJobApi(jobId, userId);

      // Handle success response
      setSuccessMessage("Successfully applied for the job!");
    } catch (err: any) {
      // Handle errors
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    successMessage,
    applyForJob,
  };
};

export default useApplyForJob;
