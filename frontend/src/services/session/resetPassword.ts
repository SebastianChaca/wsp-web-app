import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from '../makeRequest';

import { AUTH, RESETPASSWORD, SESSION } from './const';
import { SessionAPIResponse } from '../../types/session/session';

export interface Props {
  password: string;
  token: string;
}

export const resetPassword = createAsyncThunk(
  `${SESSION}/${RESETPASSWORD}`,
  async ({ token, password }: Props) => {
    const response = await makeRequest<SessionAPIResponse>(
      `/${AUTH}/${RESETPASSWORD}?token=${token}`,
      {
        data: { password },
        method: 'post',
      }
    );

    return response;
  }
);
