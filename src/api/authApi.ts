// src/api/authApi.ts
import apiClient from './apiClient';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/authenticate/user_login', {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error logging in:', error);
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await apiClient.post('/user/create-user', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error registering user:', error);
    throw new Error(error.response?.data?.message || 'Failed to register');
  }
};
