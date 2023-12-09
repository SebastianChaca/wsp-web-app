import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import { PaginatedMessages } from '../../types/message/message';

import { MESSAGE } from './const';

export const getMessages = createAsyncThunk(
  'chat/messages',
  async (uid: string) => {
    const response = await makePrivateRequest<PaginatedMessages>(
      `/${MESSAGE}/${uid}`
    );

    // // TODO: mover a redux
    // const sanitMessages = sanitizeMessages(response);

    return response;
  }
);
