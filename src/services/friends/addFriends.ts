import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import { friendFromApi } from '../../types/friend/friend';
import { FRIEND } from './const';

export const addFriend = createAsyncThunk(
  'chat/addFrien',
  async (email: { email: string }) => {
    const response = await makePrivateRequest<friendFromApi>(FRIEND, {
      data: email,
      method: 'post',
    });
    return response;
  }
);
export const addFriendRequest = async (email: { email: string }) => {
  const response = await makePrivateRequest<friendFromApi>(FRIEND, {
    data: email,
    method: 'post',
  });
  return response;
};
