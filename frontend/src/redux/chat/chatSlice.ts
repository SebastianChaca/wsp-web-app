import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMessages } from '../../services/messages/index';
import { addFriend } from '../../services/friends';
import { message, messageUI } from '../../types/message/message';
import { friend, friendsAPIResponse } from '../../types/friend/friend';
import { ChatState } from '../../types/chatState/chatState';
import {
  resetNotification,
  updateFriendIsTyping,
  updateFriendList,
  updateMessageAndNotifications,
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
      } else {
        state.friends = updateMessageAndNotifications(
          state.friends,
          action.payload
        );
      }
    },

    // si el usuario vio el mensaje
    // se dispara cuando el mensaje esta en el active chat
    updateSeenMessages: (state, action: PayloadAction<messageUI[]>) => {
      const elementsToDelete = action.payload.length;

      const arrayLength = state.messages.length;

      state.messages.splice(arrayLength - elementsToDelete, elementsToDelete);
      const newArr = state.messages.concat(action.payload);
      state.messages = newArr;
    },
    // cuando se selecciona el chat activo se resetean las notificaciones
    resetNotifications: (state, action: PayloadAction<{ uid: string }>) => {
      state.friends = resetNotification(state.friends, action.payload.uid);
    },
    addFierndToList: (state, action: PayloadAction<friend>) => {
      const checkIfFriendExists = state.friends?.find(
        (f) => f.user.uid === action.payload.user.uid
      );
      if (!checkIfFriendExists) {
        state.friends?.unshift(action.payload);
      }
    },
    // se dispara cuando un usuario se conecta o desconecta
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
      const { isRequesting, status, user, notifications } = action.payload;
      state.friends?.forEach((friendItem) => {
        if (friendItem.user.uid === user.uid) {
          friendItem.isRequesting = isRequesting;
          friendItem.status = status;
          friendItem.notifications = notifications;
          friendItem.user = user;
        }
      });
    },
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
        state.friends?.unshift(action.payload);
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
} = chatSlice.actions;
export default chatSlice.reducer;
