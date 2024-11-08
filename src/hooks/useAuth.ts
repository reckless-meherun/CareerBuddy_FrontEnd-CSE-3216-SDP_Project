// src/hooks/useAuth.ts
import { useState } from 'react';
import { login, signup, AuthData, SignUpData } from '../api/authApi';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (data: AuthData) => {
        setLoading(true);
        try {
            const response = await login(data);
            // Save auth token or user data to localStorage or context
            console.log('Login successful:', response);
            setError(null);
            return response;
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (data: SignUpData) => {
        setLoading(true);
        try {
            const response = await signup(data);
            console.log('Signup successful:', response);
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
