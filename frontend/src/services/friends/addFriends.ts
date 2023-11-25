import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import { friendFromApi } from '../../types/friend/friend';

interface FriendApiResponse {
  ok: boolean;
  friend: friendFromApi;
}
export const addFriend = createAsyncThunk(
  'chat/addFrien',
  async (email: { email: string }) => {
    const response = await makePrivateRequest<FriendApiResponse>('friend', {
      data: email,
      method: 'post',
    });
    return response.friend;
  }
);
export const addFriendd = async (email: { email: string }) => {
  const response = await makePrivateRequest<FriendApiResponse>('friend', {
    data: email,
    method: 'post',
  });
  return response.friend;
};
