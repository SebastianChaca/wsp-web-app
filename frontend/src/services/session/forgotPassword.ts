import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from '../makeRequest';

import { AUTH, FORGORTPASSWORD, SESSION } from './const';

export interface Props {
  email: string;
}

export const forgotPassword = createAsyncThunk(
  `${SESSION}/${FORGORTPASSWORD}`,
  async (props: Props) => {
    const response = await makeRequest<{ message: string }>(
      `/${AUTH}/${FORGORTPASSWORD}`,
      {
        data: props,
        method: 'post',
      }
    );

    return response;
  }
);
