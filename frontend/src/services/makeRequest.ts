import axios, { AxiosRequestConfig } from 'axios';
// Next we make an 'instance' of it
const api = axios.create({
  // .. where we make our configurations
  baseURL: `${process.env.REACT_APP_API_URL}/api` || '',
});

export function makeRequest<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  return api
    .request<T>({ url, ...options })
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response?.data?.msg));
}
