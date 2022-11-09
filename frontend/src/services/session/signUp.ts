import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from '../makeRequest';
import { setUser } from './utils/setUser';
import { SessionAPIResponse } from '../../types/session/session';

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export const signUp = (props: SignUpProps): Promise<SessionAPIResponse> => makeRequest<SessionAPIResponse>('/api/login/new', {
  data: props,
  method: 'post',
});
export const fetchSignUp = createAsyncThunk(
  'session/signUp',
  async (props: SignUpProps) => {
    const response = await makeRequest<SessionAPIResponse>('/login/new', {
      data: props,
      method: 'post',
    });
    setUser(response.token, response.usuario.uid);
    return response;
  },
);
