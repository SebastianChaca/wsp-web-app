import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import { PaginatedMessages } from '../../types/message/message';

import { MESSAGE } from './const';

interface Payload {
  id: string;
  page: number;
}
export const getMessages = createAsyncThunk(
  'messages/getMessagesAsync',
  async (payload: Payload) => {
    const response = await makePrivateRequest<PaginatedMessages>(
      `/${MESSAGE}/${payload.id}?page=${payload.page}`
    );

    return response;
  }
);
