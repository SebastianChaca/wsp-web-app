import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const selectChatState = (state: RootState) => state.chatSlice;
const selectActiveChat = createSelector(
  selectChatState,
  (chatState) => chatState.activeChat
);
const selectFriends = createSelector(
  selectChatState,
  (chatState) => chatState.friends
);
// active chat selector
const selectStatusPending = createSelector(
  selectActiveChat,
  (activeChat) => activeChat.status === 0
);
const selectStatusApproved = createSelector(
  selectActiveChat,
  (activeChat) => activeChat.status === 1
);

const selectStatusBlocked = createSelector(
  selectActiveChat,
  (activeChat) => activeChat.status === 2
);

export const useFriendStatusPending = () => useSelector(selectStatusPending);
export const useFriendStatusBlocked = () => useSelector(selectStatusBlocked);
export const useFriendStatusApproved = () => useSelector(selectStatusApproved);

const useGetFriend = (uid: string) => {
  const friends = useSelector(selectFriends);
  return friends?.find((friend) => friend.uid === uid);
};

export const useGetFriendStatusisApproved = (uid: string) => {
  const friend = useGetFriend(uid);
  return friend?.status === 0;
};

const selectFriendById = (friendId: string) =>
  createSelector(
    (state: RootState) => state.chatSlice.friends,
    (friends) => friends?.find((f) => f.user.uid === friendId)
  );
export const useGetFriendStatusApproved = (friendId: string) => {
  const friend = useSelector(selectFriendById(friendId));
  return friend?.status === 1;
};

export const useGetFriendStatusIsPending = (friendId: string) => {
  const friend = useSelector(selectFriendById(friendId));
  return friend?.status === 0;
};
