import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import { friendFromApi, friendsAPIResponse } from '../../types/friend/friend';

export const getFriends = createAsyncThunk('chat/friends', async () => {
  const response = await makePrivateRequest<friendFromApi[]>('/friend');
  return response;
});
