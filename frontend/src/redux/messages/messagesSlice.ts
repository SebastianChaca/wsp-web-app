import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getMessages,
  sendIconReaction,
  sendMessage,
} from '../../services/messages';
import { MessagesState } from '../../types/MessagesState/messageSlicestate';
import {
  getMessagesExtraReducer,
  sendIconReactionExtraReducer,
  sendMessagesExtraReducer,
} from './extraReducers';

import { sanitizeMessage } from '../../utils/sanitizeMessages';
import { messageUI, serverMessageResponse } from '../../types/message/message';

const initialState: MessagesState = {
  messages: [],
  messagesLoading: false,
  error: null,
  pagination: { currentPage: 0, totalPages: 0, loadingPagination: false },
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
      const updatedMessages = action.payload;

      // Iterate through the updated messages
      updatedMessages.forEach((updatedMessage) => {
        // Find the index of the message to be updated
        const index = state.messages.findIndex(
          (msg) => msg.id === updatedMessage.id
        );

        // If the message exists, update it
        if (index !== -1) {
          state.messages[index] = updatedMessage;
        }
      });
    },
    updateMessage: (state, action: PayloadAction<messageUI>) => {
      const findMessage = state.messages.findIndex(
        (msg) => msg.id === action.payload.id
      );
      if (findMessage !== -1) {
        state.messages[findMessage] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    getMessagesExtraReducer(builder, getMessages);
    sendMessagesExtraReducer(builder, sendMessage);
    sendIconReactionExtraReducer(builder, sendIconReaction);
  },
});
export const { setMessage, updateSeenMessages, updateMessage } =
  messagesSlice.actions;
export default messagesSlice.reducer;
