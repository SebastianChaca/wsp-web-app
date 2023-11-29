import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMessages } from '../../services/messages/index';
import { addFriend } from '../../services/friends';
import {
  message,
  messageUI,
  serverMessageResponse,
} from '../../types/message/message';
import { friend, friendFromApi } from '../../types/friend/friend';
import { ChatState } from '../../types/chatState/chatState';
import {
  friendUpdate,
  resetNotification,
  updateFriendIsTyping,
  updateLastMessage,
  updateNotification,
  updateLastMessageSeen,
  friendObjSanitize,
} from './accions';
import { getFriends } from '../../services/friends/getFriends';
import { sanitizeMessage } from '../../utils/sanitizeMessages';
import {
  addFriendsExtraReducer,
  getFriendsExtraReducer,
  getMessagesExtraReducer,
} from './extraReducers';

const initialState: ChatState = {
  messages: [],
  friends: [],
  isLoading: false,
  error: null,
  friendId: '',
  friendsLoading: true,
  messagesLoading: true,
};
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setFriendId: (state, action: PayloadAction<string>) => {
      state.friendId = action.payload;
    },
    setFriendIsTyping: (state, action: PayloadAction<message>) => {
      state.friends = updateFriendIsTyping(state.friends, action.payload);
    },
    setMessages: (state, action: PayloadAction<serverMessageResponse>) => {
      const parsedMessage = sanitizeMessage(action.payload);

      if (
        state.friendId === parsedMessage.to ||
        state.friendId === parsedMessage.from
      ) {
        state.messages.push(parsedMessage);
      }
      if (action.payload.from) {
        state.friends = updateNotification(state.friends, parsedMessage.from);
      }
      state.friends = updateLastMessage(state.friends, parsedMessage);
    },
    updateSeenMessages: (state, action: PayloadAction<messageUI[]>) => {
      const elementsToDelete = action.payload.length;

      const arrayLength = state.messages.length;

      state.messages.splice(arrayLength - elementsToDelete, elementsToDelete);
      const newArr = state.messages.concat(action.payload);
      state.messages = newArr;
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
    updateFriend: (state, action: PayloadAction<friend>) => {
      state.friends = friendUpdate(state.friends, action.payload);
    },
    resetChatState: () => initialState,
  },
  extraReducers: (builder) => {
    getFriendsExtraReducer(builder, getFriends);
    getMessagesExtraReducer(builder, getMessages);
    addFriendsExtraReducer(builder, addFriend);
  },
});
export const {
  setMessages,
  updateSeenMessages,
  addFierndToList,
  resetNotifications,
  updateFriendStatus,
  updateFriend,
  setFriendId,
  setFriendIsTyping,
  updateLastMessageSeenStatus,
  resetChatState,
} = chatSlice.actions;
export default chatSlice.reducer;
