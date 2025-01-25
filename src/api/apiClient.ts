import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface RateLimiterOptions {
  maxRequests: number;
  intervalMs: number;
}

class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private intervalMs: number;

  constructor(options: RateLimiterOptions) {
    this.maxRequests = options.maxRequests;
    this.intervalMs = options.intervalMs;
  }

  async waitForRequest(): Promise<void> {
    const now = Date.now();
    
    // Remove expired timestamps
    this.requests = this.requests.filter(
      timestamp => now - timestamp < this.intervalMs
    );

    // Check if we've reached the maximum number of requests
    if (this.requests.length >= this.maxRequests) {
      const oldestRequestTime = this.requests[0];
      const waitTime = this.intervalMs - (now - oldestRequestTime);
      
      // Wait if necessary
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }

    // Add current request timestamp
    this.requests.push(now);
  }
}

class RateLimitedApiClient {
  private axiosInstance: AxiosInstance;
  private rateLimiter: RateLimiter;

  constructor(
    config: AxiosRequestConfig, 
    rateLimiterOptions: RateLimiterOptions = { maxRequests: 10, intervalMs: 1000 }
  ) {
    this.axiosInstance = axios.create(config);
    this.rateLimiter = new RateLimiter(rateLimiterOptions);

    // Intercept requests to apply rate limiting
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        await this.rateLimiter.waitForRequest();
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get(url, config);
  }

  async post<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return this.axiosInstance.post(url, data, config);
  }

  async put<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return this.axiosInstance.put(url, data, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete(url, config);
  }

  // Add more methods as needed (patch, etc.)
}

// Create the rate-limited API client
const apiClient = new RateLimitedApiClient({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Optional: Additional Axios configuration
  timeout: 10000, // 10 seconds timeout
}, {
  maxRequests: 10,  // Maximum of 10 requests
  intervalMs: 1000  // per 1 second
});

export default apiClient;