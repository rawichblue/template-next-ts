import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const createApiInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use((config) => {
    // attach auth token if needed
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      // centralised error handling
      const message = error.response?.data?.message ?? error.message;
      return Promise.reject(new Error(message));
    },
  );

  return instance;
};

export const api = createApiInstance(process.env.NEXT_PUBLIC_API_URL ?? '/api');

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const res: AxiosResponse<T> = await api.request(config);
  return res.data;
};
