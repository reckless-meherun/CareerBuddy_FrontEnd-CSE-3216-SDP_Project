import { useState } from "react";
import { 
  searchProfile, 
  createProfile, 
  getskills, 
  searchskills, 
  updateProfile, 
  uploadProfileImage 
} from "../api/profileApi";
import UserStorage from "@/utilities/UserStorage";
import { useNavigate } from "react-router-dom";

// Define types for the skills
type SkillDTO = { id: string; name: string };
type SkillRequest = { name: string };

// Middleware context and types
type MiddlewareContext = {
  userId?: string;
  requestData?: () => Promise<any>;
  responseData?: any;
  error?: any;
};

type Middleware = (
  context: MiddlewareContext,
  next: () => Promise<void>
) => Promise<void>;

const createMiddlewarePipeline = (middlewares: Middleware[]) => {
  return async (context: MiddlewareContext) => {
    let index = -1;

    const runner = async (currentIndex: number): Promise<void> => {
      if (currentIndex <= index) throw new Error("next() called multiple times");
      index = currentIndex;

      const middleware = middlewares[currentIndex];
      if (middleware) {
        await middleware(context, () => runner(currentIndex + 1));
      }
    };

    await runner(0);
  };
};

// Middleware implementations
const validateUserMiddleware: Middleware = async (context, next) => {
  if (!context.userId) {
    throw new Error("User is not authenticated. Please log in.");
  }
  await next();
};

const logMiddleware: Middleware = async (context, next) => {
  console.log("Request started with data:", context.requestData);
  await next();
  console.log("Response received:", context.responseData);
};

const apiCallMiddleware: Middleware = async (context, next) => {
  try {
    context.responseData = await context.requestData();
  } catch (error) {
    context.error = error;
    throw error;
  }
  await next();
};

const errorHandlerMiddleware: Middleware = async (context, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error:", error);
    context.error = error;
  }
};

// The useProfile hook
export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = UserStorage.getUser();
  const userId = user?.id;
  const navigate = useNavigate();

  const executeWithMiddleware = async (
    middlewares: Middleware[],
    requestData: () => Promise<any>
  ) => {
    setLoading(true);
    setError(null);

    const context: MiddlewareContext = {
      userId,
      requestData,
    };

    const pipeline = createMiddlewarePipeline(middlewares);

    try {
      await pipeline(context);
      return context.responseData;
    } catch (err) {
      setError((err as Error).message || "An error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    return await executeWithMiddleware(
      [validateUserMiddleware, logMiddleware, apiCallMiddleware, errorHandlerMiddleware],
      () => searchProfile(userId!)
    );
  };

  const makeProfile = async (
    id: string, 
    name: string, 
    bio: string, 
    email: string, 
    phoneNumber: string, 
    role: string, 
    address: string, 
    readySkills: SkillDTO[] = [], 
    newSkills: SkillRequest[] = [], 
    experiences: any, 
    educations: any
  ) => {
    const profileData = {
      user_id: id,
      name,
      bio,
      email,
      phoneNumber,
      role,
      address,
      readySkills,
      newSkills,
      experiences,
      educations,
    };

    return await executeWithMiddleware(
      [validateUserMiddleware, logMiddleware, apiCallMiddleware, errorHandlerMiddleware],
      () => createProfile(profileData)
    );
  };

  const fetchSkills = async () => {
    return await executeWithMiddleware(
      [logMiddleware, apiCallMiddleware, errorHandlerMiddleware],
      getskills
    );
  };

  const useFetchSkills = async (id: string) => {
    return await executeWithMiddleware(
      [logMiddleware, apiCallMiddleware, errorHandlerMiddleware],
      () => searchskills(id)
    );
  };

  const useUpdateProfile = async (
    id: string, 
    name: string, 
    bio: string, 
    email: string, 
    phoneNumber: string, 
    role: string, 
    address: string, 
    readySkills: SkillDTO[] = [], 
    newSkills: SkillRequest[] = [], 
    experiences: any, 
    educations: any
  ) => {
    const profileData = {
      user_id: id,
      name,
      bio,
      email,
      phoneNumber,
      role,
      address,
      readySkills,
      newSkills,
      experiences,
      educations,
    };

    return await executeWithMiddleware(
      [validateUserMiddleware, logMiddleware, apiCallMiddleware, errorHandlerMiddleware],
      () => updateProfile(profileData)
    );
  };

  const useUploadPhoto = async (formData: FormData) => {
    return await executeWithMiddleware(
      [validateUserMiddleware, logMiddleware, apiCallMiddleware, errorHandlerMiddleware],
      () => uploadProfileImage(userId!, formData)
    );
  };

  return {
    loading,
    error,
    getProfile,
    makeProfile,
    fetchSkills,
    useFetchSkills,
    useUpdateProfile,
    useUploadPhoto,
  };
};
