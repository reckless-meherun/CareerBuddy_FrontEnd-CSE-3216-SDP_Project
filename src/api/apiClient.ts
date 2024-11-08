// src/api/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.BACKEND_URL, // Adjust to your Spring Boot API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
