import { AxiosRequestConfig } from 'axios';
import { makeRequest } from './makeRequest';
import { getUser } from './session/utils/setUser';

export function makePrivateRequest<T>(
  url: string,
  options?: AxiosRequestConfig
) {
  const { token } = getUser();
  return makeRequest<T>(url, {
    ...options,
    headers: {
      'x-token': token,
    },
  });
}
