// src/api/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // Use VITE_BASE_URL to match the environment variable name
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
