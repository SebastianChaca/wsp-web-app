import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import {
  messageToServer,
  serverMessageResponse,
} from '../../types/message/message';
import { MESSAGE } from './const';

export const sendMessage = createAsyncThunk(
  'chat/getMessage',
  async (props: messageToServer) => {
    delete props.isLoading;
    delete props.temporalId;
    const response = await makePrivateRequest<serverMessageResponse>(
      `/${MESSAGE}`,
      { data: props, method: 'post' }
    );
    return response;
  }
);
