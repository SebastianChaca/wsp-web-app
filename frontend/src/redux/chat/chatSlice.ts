import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMessages } from '../../services/messages/index';
import { addFriend } from '../../services/friends';
import {
  ChatState,
  messageUI,
  activeChat,
  message,
} from '../../types/message/message';

import { friend } from '../../types/session/session';

const initialState: ChatState = {
  messages: [],
  friends: [],
  isLoading: false,
  error: null,

  activeChat: {
    isRequesting: false,
    name: '',
    email: null,
    online: false,
    uid: null,
    isTyping: false,
    lastActive: '',
    status: null,
  },
};
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setFriendsList: (state, action: PayloadAction<friend[]>) => {
      state.friends = action.payload;
    },
    // chat selecionado por el usuario
    setActiveChat: (state, action: PayloadAction<activeChat>) => {
      if (state.activeChat.uid === action.payload.uid) return;
      console.log('if');
      state.activeChat = action.payload;
      // state.messages = [];
    },
    setMessages: (state, action: PayloadAction<messageUI>) => {
      if (
        state.activeChat.uid === action.payload.to ||
        state.activeChat.uid === action.payload.from
      ) {
        state.messages.push(action.payload);
      } else {
        // TODO: si el mensaje no esta en active chat chequear si son amigos
        // si lo son agrego notificacion
        // si no son lo agrego a amigos con status 0 (requested)
        // primero en la lista y con notificacion
        // console.log(action.payload);
      }
    },
    // si el usuario esta escribiendo un mensaje
    setIsTyping: (state, action: PayloadAction<message>) => {
      if (action.payload.message.length > 0) {
        if (
          state.activeChat.uid === action.payload.to ||
          state.activeChat.uid === action.payload.from
        ) {
          state.activeChat.isTyping = true;
        }
      } else {
        state.activeChat.isTyping = false;
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
    // notificacion de mensaje cuando no esta en el chat activo
    updateNotifications: (state, action: PayloadAction<messageUI>) => {
      if (action.payload.from !== state.activeChat.uid) {
        if (state.friends) {
          state.friends.forEach((friendItem) => {
            if (action.payload.from === friendItem.user.uid) {
              friendItem.notifications += 1;
              return friendItem;
            }
            return friendItem;
          });
        }
      }
    },
    // cuando se selecciona el chat activo se resetean las notificaciones
    resetNotifications: (
      state,
      action: PayloadAction<{ uid: string | null }>
    ) => {
      state.friends?.forEach((friendItem) => {
        if (action.payload.uid === friendItem.user.uid) {
          friendItem.notifications = 0;
          return friendItem;
        }
        return friendItem;
      });
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
    updateFriendsList: (state, action: PayloadAction<friend>) => {
      const { isRequesting, status, user, notifications } = action.payload;
      state.friends?.forEach((friendItem) => {
        if (friendItem.user.uid === user.uid) {
          friendItem.isRequesting = isRequesting;
          friendItem.status = status;
          friendItem.notifications = notifications;
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
  setActiveChat,
  setMessages,
  setIsTyping,
  updateSeenMessages,
  addFierndToList,
  updateNotifications,
  resetNotifications,
  updateFriendStatus,
  updateFriendsList,
} = chatSlice.actions;
export default chatSlice.reducer;
