import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import {
  messageToServer,
  serverMessageResponse,
} from '../../types/message/message';

export const sendMessage = createAsyncThunk(
  'chat/getMessage',
  async (props: messageToServer) => {
    delete props.isLoading;
    delete props.temporalId;
    const response = await makePrivateRequest<serverMessageResponse>(
      `/message`,
      { data: props, method: 'post' }
    );
    return response;
  }
);
