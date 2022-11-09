import axios from 'axios';
// Next we make an 'instance' of it
const api = axios.create({
  // .. where we make our configurations
  baseURL: `${process.env.REACT_APP_API_URL}/api` || '',
});

export function makeRequest<T>(url: string, options?: {}): Promise<T> {
  return api(url, options)
    .then((res: any) => res.data)
    .catch((error: any) => Promise.reject(error.response.data.msg));
}
