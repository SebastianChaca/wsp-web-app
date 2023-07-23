import axios, { AxiosRequestConfig } from 'axios';
import { getUser } from './session/utils/setUser';

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api` || '',
});
api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const { token } = getUser();
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});
export function makePrivateRequest<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  return api
    .request<T>({ url, ...options })
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response?.data?.msg));
}
