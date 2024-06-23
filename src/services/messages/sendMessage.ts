import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import {
  messageToServer,
  serverMessageResponse,
} from '../../types/message/message';
import { MESSAGE } from './const';

export const sendMessage = createAsyncThunk(
  'chat/getMessage',
  async (props: {
    message: messageToServer;
    imagePreview: ArrayBuffer | undefined | null | string;
  }) => {
    delete props.message.isLoading;

    const response = await makePrivateRequest<serverMessageResponse>(
      `/${MESSAGE}`,
      { data: props.message, method: 'post' }
    );
    return response;
  }
);
