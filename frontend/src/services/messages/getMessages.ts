import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import { serverMessageResponse } from '../../types/message/message';
import { sanitizeMessages } from '../../utils/sanitizeMessages';
import { MESSAGE } from './const';

export const getMessages = createAsyncThunk(
  'chat/messages',
  async (uid: string) => {
    const response = await makePrivateRequest<serverMessageResponse[]>(
      `/${MESSAGE}/${uid}`
    );

    // TODO: mover a redux
    const sanitMessages = sanitizeMessages(response);

    return sanitMessages;
  }
);
