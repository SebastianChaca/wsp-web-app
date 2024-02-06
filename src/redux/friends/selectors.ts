import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const selectChatState = (state: RootState) => state.friendsSlice;

const selectFriends = createSelector(
  selectChatState,
  (chatState) => chatState.friends
);

const useGetFriend = (uid: string) => {
  const friends = useSelector(selectFriends);
  return friends?.find((friend) => friend.uid === uid);
};

export const useGetFriendStatusisApproved = (uid: string) => {
  const friend = useGetFriend(uid);
  return friend?.status === 0;
};

export const selectFriendById = (friendId: string) =>
  createSelector(
    (state: RootState) => state.friendsSlice.friends,
    (friends) => friends?.find((f) => f.user.uid === friendId)
  );
export const useFriend = (friendId: string) =>
  useSelector(selectFriendById(friendId));
