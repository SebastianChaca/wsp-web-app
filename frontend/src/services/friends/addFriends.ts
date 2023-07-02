import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import { friend } from '../../types/friend/friend';

interface FriendApiResponse {
  ok: boolean;
  friend: friend;
}
export const addFriend = createAsyncThunk(
  'chat/addFrien',
  async (email: { email: string }) => {
    const response = await makePrivateRequest<FriendApiResponse>(
      'friends/addfriend',
      {
        data: email,
        method: 'post',
      }
    );
    return response.friend;
  }
);
export const addFriendd = async (email: { email: string }) => {
  const response = await makePrivateRequest<FriendApiResponse>(
    'friends/addfriend',
    {
      data: email,
      method: 'post',
    }
  );
  return response.friend;
};
