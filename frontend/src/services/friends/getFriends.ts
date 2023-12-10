import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import { PaginatedFriends } from '../../types/friend/friend';
import { FRIEND } from './const';

export const getFriends = createAsyncThunk('chat/friends', async () => {
  const response = await makePrivateRequest<PaginatedFriends>(
    `${FRIEND}?page=1`
  );
  return response;
});
