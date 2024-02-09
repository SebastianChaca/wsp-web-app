import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from '../makeRequest';
import { setUser } from './utils/setUser';
import { SessionAPIResponse } from '../../types/session/session';
import { AUTH, LOGIN } from './const';

export interface SignInProps {
  email: string;
  password: string;
}

export const signIn = (props: SignInProps): Promise<SessionAPIResponse> =>
  makeRequest<SessionAPIResponse>(`/${AUTH}/login`, {
    data: props,
    method: 'post',
  });
export const fetchSignIn = createAsyncThunk(
  'session/login',
  async (props: SignInProps, { rejectWithValue }) => {
    try {
      const response = await makeRequest<SessionAPIResponse>(
        `/${AUTH}/${LOGIN}`,
        {
          data: props,
          method: 'post',
        }
      );

      setUser(response.token, response.user.id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
