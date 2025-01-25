import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";

type AuthData = {
  email: string;
  password: string;
};

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

type Middleware<T> = (data: T, next: (data: T) => Promise<T>) => Promise<T>;

const executeMiddleware = async <T>(
  data: T,
  middlewares: Middleware<T>[],
  finalHandler: (data: T) => Promise<T>
): Promise<T> => {
  const stack = [...middlewares];

  const invokeNext = async (currentData: T): Promise<T> => {
    const nextMiddleware = stack.shift();
    if (nextMiddleware) {
      return nextMiddleware(currentData, invokeNext);
    }
    return finalHandler(currentData);
  };

  return invokeNext(data);
};

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loggingMiddleware: Middleware<AuthData | SignUpData> = async (
    data,
    next
  ) => {
    console.log("Before process:", data);
    const result = await next(data);
    console.log("After process:", result);
    return result;
  };

  const validateEmailMiddleware: Middleware<AuthData | SignUpData> = async (
    data,
    next
  ) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error("Invalid email format");
    }
    return next(data);
  };

  const handleLogin = async (authData: AuthData) => {
    setLoading(true);
    try {
      const response = await executeMiddleware(
        authData,
        [loggingMiddleware, validateEmailMiddleware],
        (data) => loginUser(data.email, data.password)
      );
      setError(null);
      return response;
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (signUpData: SignUpData) => {
    setLoading(true);
    try {
      const response = await executeMiddleware(
        signUpData,
        [loggingMiddleware, validateEmailMiddleware],
        (data) => registerUser(data.name, data.email, data.password)
      );
      setError(null);
      return response;
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleSignup, loading, error };
};
