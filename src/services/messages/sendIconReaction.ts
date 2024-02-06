import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import { serverMessageResponse } from '../../types/message/message';
import { MESSAGE } from './const';

export const sendIconReaction = createAsyncThunk(
  'chat/iconReaction',
  async ({ id, iconReactions }: { id: string; iconReactions: string }) => {
    const response = await makePrivateRequest<serverMessageResponse>(
      `/${MESSAGE}/${id}/updatereaction`,
      {
        method: 'patch',
        data: { iconReactions },
      }
    );
    return response;
  }
);
