import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import { setUser } from './utils/setUser';
import { SessionAPIResponse } from '../../types/session/session';

export const refreshToken = createAsyncThunk('session/refresh', async () => {
  const response = await makePrivateRequest<SessionAPIResponse>(
    '/auth/refresh'
  );
  setUser(response.token, response.user.id);
  return response;
});
