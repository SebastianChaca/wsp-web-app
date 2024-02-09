import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from '../makeRequest';
import { setUser } from './utils/setUser';
import { SessionAPIResponse } from '../../types/session/session';
import { USER } from './const';

export interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export const signUp = (props: SignUpProps): Promise<SessionAPIResponse> =>
  makeRequest<SessionAPIResponse>(`/${USER}`, {
    data: props,
    method: 'post',
  });
export const fetchSignUp = createAsyncThunk(
  'session/signUp',
  async (props: SignUpProps, { rejectWithValue }) => {
    try {
      const response = await makeRequest<SessionAPIResponse>(`/${USER}`, {
        data: props,
        method: 'post',
      });
      setUser(response.token, response.user.id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
