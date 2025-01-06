// src/hooks/useAuth.ts
import { useState } from 'react';
import { loginUser, registerUser } from '../api/authApi';

type AuthData = {
  email: string;
  password: string;
};

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async ({ email, password }: AuthData) => {
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      // console.log('Login successful:', response);
      setError(null);
      return response;
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async ({ name, email, password }: SignUpData) => {
    setLoading(true);
    try {
      const response = await registerUser(name, email, password);
      // console.log('Signup successful:', response);
      setError(null);
      return response;
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleSignup, loading, error };
};
