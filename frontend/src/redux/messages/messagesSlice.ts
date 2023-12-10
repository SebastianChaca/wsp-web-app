import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getMessages, sendMessage } from '../../services/messages';
import { MessagesState } from '../../types/MessagesState/messageSlicestate';
import {
  getMessagesExtraReducer,
  sendMessagesExtraReducer,
} from './extraReducers';

import { sanitizeMessage } from '../../utils/sanitizeMessages';
import { messageUI, serverMessageResponse } from '../../types/message/message';

const initialState: MessagesState = {
  messages: [],
  messagesLoading: false,
  error: null,
  pagination: { currentPage: 0, totalPages: 0 },
  loadingPagination: false,
};
export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<serverMessageResponse>) => {
      const parsedMessage = sanitizeMessage(action.payload);
      state.messages.push(parsedMessage);
    },
    updateSeenMessages: (state, action: PayloadAction<messageUI[]>) => {
      const elementsToDelete = action.payload.length;

      const arrayLength = state.messages.length;

      state.messages.splice(arrayLength - elementsToDelete, elementsToDelete);
      const newArr = state.messages.concat(action.payload);
      state.messages = newArr;
    },
  },
  extraReducers: (builder) => {
    getMessagesExtraReducer(builder, getMessages);
    sendMessagesExtraReducer(builder, sendMessage);
  },
});
export const { setMessage, updateSeenMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
