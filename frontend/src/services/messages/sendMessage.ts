import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import { serverMessageResponse } from '../../types/message/message';

export const sendMessage = createAsyncThunk(
  'chat/messages',
  async (uid: string) => {
    const response = await makePrivateRequest<serverMessageResponse[]>(
      `/message/${uid}`
    );

    // TODO: mover a redux
    //   const sanitMessages = sanitizeMessage(response);

    //   return sanitMessages;
  }
);
