// src/api/authApi.ts
import apiClient from './apiClient';

export interface AuthData {
    email: string;
    password: string;
}

export interface SignUpData extends AuthData {
    name: string;
}

export const login = async (data: AuthData) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data; // Typically contains tokens or user info
};

export const signup = async (data: SignUpData) => {
    const response = await apiClient.post('/auth/signup', data);
    return response.data; // Success message or user info
};
