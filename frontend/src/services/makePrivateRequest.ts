import { AxiosRequestConfig } from 'axios';
import { api } from './makeRequest';
import { getUser } from './session/utils/setUser';

api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const { token } = getUser();
  config.headers['x-token'] = token;
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
