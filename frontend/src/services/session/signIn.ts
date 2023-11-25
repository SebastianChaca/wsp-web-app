import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from '../makeRequest';
import { setUser } from './utils/setUser';
import { SessionAPIResponse } from '../../types/session/session';

interface SignInProps {
  email: string;
  password: string;
}

export const signIn = (props: SignInProps): Promise<SessionAPIResponse> =>
  makeRequest<SessionAPIResponse>('/auth/login', {
    data: props,
    method: 'post',
  });
export const fetchSignIn = createAsyncThunk(
  'session/login',
  async (props: SignInProps) => {
    const response = await makeRequest<SessionAPIResponse>('/auth/login', {
      data: props,
      method: 'post',
    });

    setUser(response.token, response.user.id);
    return response;
  }
);
