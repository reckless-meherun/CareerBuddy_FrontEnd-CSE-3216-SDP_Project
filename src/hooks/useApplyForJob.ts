import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { applyForJobApi, getAppliedJobs, getJobApplication, getJobApplications,updateJobApplications, updatePriorityIndex } from "../api/jobApplicationApi";
import UserStorage from "@/utilities/UserStorage"; // Adjust the path to your UserStorage utility

const useApplyForJob = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const user = UserStorage.getUser();
  const userId = user?.id;

  const applyForJob = async (jobId: string) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      if (!userId) {
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
  const useGetAppliedlJobs = async () => {
    setIsLoading(true);
    setError(null);
    // setSuccessMessage("");

    try {
      if (!userId) {
        navigate("/login", { state: { from: location.pathname } });
        return;
      }

      // Call the API function
      const response =await getAppliedJobs( userId);
      return response;
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const usegetJobApplications = async (jobId:string) => {
    setIsLoading(true);
    setError(null);
    // setSuccessMessage("");
    try {
      const response = getJobApplications(jobId)
      return response;
    }
    catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }

  }
  const usegetJobApplication = async (applicationId:string) => {
    setIsLoading(true);
    setError(null);
    // setSuccessMessage("");
    try {
      const response = getJobApplication(applicationId)
      return response;
    }
    catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }

  }
  const useUpdateJobApplications = async (applicationId:string,status:string)=>{
    setIsLoading(true);
    setError(null);
    try {
      await updateJobApplications(applicationId,status);
      return "Application status updated successfully";
    }
    
    catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  const useUpdtapriorityIndes = async (applicationId: string, position:number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await updatePriorityIndex(applicationId, position);
      return response;
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  

  return {
    isLoading,
    error,
    successMessage,
    applyForJob,
    useGetAppliedlJobs, // Add this function to your component to fetch applied jobs for a user.
    usegetJobApplications, // Add this function to your component to fetch job applications for a job.
    useUpdateJobApplications,
    usegetJobApplication,
    useUpdtapriorityIndes, // Add this function to your component to update priority index of a job application.
  };
};

export default useApplyForJob;
