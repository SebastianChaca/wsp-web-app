import { AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ChatState } from '../../../types/chatState/chatState';
import { PaginatedMessages } from '../../../types/message/message';
import { sanitizeMessages } from '../../../utils/sanitizeMessages';

export const getMessagesExtraReducer = (
  builder: ActionReducerMapBuilder<ChatState>,
  getMessages: AsyncThunk<PaginatedMessages, string, {}>
) => {
  builder
    // get messages
    .addCase(getMessages.fulfilled, (state, action) => {
      state.messages = sanitizeMessages(action.payload.messages);
      state.messagesLoading = false;
    })
    .addCase(getMessages.pending, (state) => {
      state.messagesLoading = true;
    })
    .addCase(getMessages.rejected, (state) => {
      state.error = 'error';
      state.messagesLoading = false;
    });
};
