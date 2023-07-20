import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMessages } from '../../services/messages/index';
import { addFriend } from '../../services/friends';
import { message, messageUI } from '../../types/message/message';
import {
  friend,
  friendFromApi,
  friendsAPIResponse,
} from '../../types/friend/friend';
import { ChatState } from '../../types/chatState/chatState';
import {
  friendUpdate,
  resetNotification,
  updateFriendIsTyping,
  updateFriendList,
  updateLastMessage,
  updateNotification,
  updateLastMessageSeen,
  friendObjSanitize,
} from './accions';

const initialState: ChatState = {
  messages: [],
  friends: [],
  isLoading: false,
  error: null,
  friendId: '',
};
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setFriendId: (state, action: PayloadAction<string>) => {
      state.friendId = action.payload;
    },
    setFriendsList: (state, action: PayloadAction<friendsAPIResponse>) => {
      state.friends = updateFriendList(action.payload);
    },
    setFriendIsTyping: (state, action: PayloadAction<message>) => {
      state.friends = updateFriendIsTyping(state.friends, action.payload);
    },
    setMessages: (state, action: PayloadAction<messageUI>) => {
      if (
        state.friendId === action.payload.to ||
        state.friendId === action.payload.from
      ) {
        state.messages.push(action.payload);
      }
      if (action.payload.from) {
        state.friends = updateNotification(state.friends, action.payload.from);
      }
      state.friends = updateLastMessage(state.friends, action.payload);
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
        (f) => f.user.uid === action.payload.user.uid
      );
      if (!checkIfFriendExists) {
        state.friends?.unshift(friendObjSanitize(action.payload));
      }
    },
    updateFriendStatus: (
      state,
      action: PayloadAction<{ uid: string; online: boolean }>
    ) => {
      state.friends?.forEach((friendItem) => {
        if (friendItem.user.uid === action.payload.uid) {
          friendItem.user.online = action.payload.online;
        }
      });
    },
    updateFriend: (state, action: PayloadAction<friend>) => {
      state.friends = friendUpdate(state.friends, action.payload);
    },
    resetChatState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getMessages.fulfilled,
        (state, action: PayloadAction<messageUI[]>) => {
          state.messages = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.rejected, (state) => {
        state.error = 'error';
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.friends?.unshift(friendObjSanitize(action.payload));
        state.isLoading = false;
      })
      .addCase(addFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  },
});
export const {
  setFriendsList,
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
