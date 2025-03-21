import axios, { AxiosRequestConfig } from 'axios';

// Next we make an 'instance' of it
export const api = axios.create({
  // .. where we make our configurations
  baseURL: `${import.meta.env.VITE_API_URL}/api/v2` || '',
});

export function makeRequest<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  return api
    .request<T>({ url, ...options })
    .then((res) => res.data)
    .catch((error) => {
      return Promise.reject(error.response.data.message);
    });
}
