import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendMessage } from '../../services/messages/index';

import {
  message,
  messageUI,
  serverMessageResponse,
} from '../../types/message/message';
import { friendFromApi } from '../../types/friend/friend';
import { ChatState } from '../../types/chatState/chatState';
import {
  friendUpdate,
  resetNotification,
  updateFriendIsTyping,
  updateLastMessage,
  updateLastMessageSeen,
  friendObjSanitize,
  unshiftFriend,
  updateNotification,
} from './accions';
import { getFriends } from '../../services/friends/getFriends';
import { sanitizeMessage } from '../../utils/sanitizeMessages';
import {
  getFriendsExtraReducer,
  updateLastMessageAndNotifications,
} from './extraReducers';

const initialState: ChatState = {
  friends: [],
  isLoading: false,
  error: null,
  friendId: '',
  friendsLoading: true,
  pagination: { currentPage: 0, totalPages: 0, loadingPagination: false },
};
export const chatSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriendId: (state, action: PayloadAction<string>) => {
      state.friendId = action.payload;
    },
    setFriendIsTyping: (state, action: PayloadAction<message>) => {
      state.friends = updateFriendIsTyping(state.friends, action.payload);
    },
    setLastMessageAndNotification: (
      state,
      action: PayloadAction<serverMessageResponse>
    ) => {
      const parsedMessage = sanitizeMessage(action.payload);

      if (action.payload.from) {
        state.friends = updateNotification(state.friends, parsedMessage.from);
      }
      state.friends = updateLastMessage(state.friends, parsedMessage);
      state.friends = unshiftFriend(state.friends, parsedMessage.from);
    },

    updateLastMessageSeenStatus: (state, action: PayloadAction<messageUI>) => {
      state.friends = updateLastMessageSeen(state.friends, action.payload);
    },
    resetNotifications: (state, action: PayloadAction<{ uid: string }>) => {
      state.friends = resetNotification(state.friends, action.payload.uid);
    },
    addFierndToList: (state, action: PayloadAction<friendFromApi>) => {
      const checkIfFriendExists = state.friends?.find(
        (f) => f.user.uid === action.payload.user.id
      );

      if (!checkIfFriendExists) {
        state.friends?.unshift(friendObjSanitize(action.payload));
      }
    },
    updateFriendStatus: (
      state,
      action: PayloadAction<{
        uid: string;
        online: boolean;
        lastActive?: string;
      }>
    ) => {
      state.friends?.forEach((friendItem) => {
        if (friendItem.user.uid === action.payload.uid) {
          friendItem.user.online = action.payload.online;
          if (!action.payload.online && action.payload.lastActive) {
            friendItem.user.lastActive = action.payload.lastActive;
          }
        }
      });
    },
    updateFriend: (state, action: PayloadAction<friendFromApi>) => {
      const parseFriend = friendObjSanitize(action.payload);
      state.friends = friendUpdate(state.friends, parseFriend);
    },
    resetChatState: () => initialState,
    resetSelectedFriendId: (state) => {
      state.friendId = '';
    },
  },
  extraReducers: (builder) => {
    getFriendsExtraReducer(builder, getFriends);
    updateLastMessageAndNotifications(builder, sendMessage);
  },
});
export const {
  setLastMessageAndNotification,
  addFierndToList,
  resetNotifications,
  updateFriendStatus,
  updateFriend,
  setFriendId,
  setFriendIsTyping,
  updateLastMessageSeenStatus,
  resetChatState,
  resetSelectedFriendId,
} = chatSlice.actions;
export default chatSlice.reducer;
