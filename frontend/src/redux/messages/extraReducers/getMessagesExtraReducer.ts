import { AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { PaginatedMessages } from '../../../types/message/message';
import { MessagesState } from '../../../types/MessagesState/messageSlicestate';
import { sanitizeMessages } from '../../../utils/sanitizeMessages';

export const getMessagesExtraReducer = (
  builder: ActionReducerMapBuilder<MessagesState>,
  getMessages: AsyncThunk<PaginatedMessages, { id: string; page: number }, {}>
) => {
  builder
    // get messages
    .addCase(getMessages.fulfilled, (state, action) => {
      const messages = sanitizeMessages(action.payload.messages);
      if (action.meta.arg.page > 1) {
        state.messages = [...messages, ...state.messages];
      } else {
        state.messages = messages;
      }
      state.pagination.currentPage = action.payload.currentPage;
      state.pagination.totalPages = action.payload.totalPages;
      state.messagesLoading = false;
      state.loadingPagination = false;
    })
    .addCase(getMessages.pending, (state) => {
      if (state.messages.length > 0) {
        state.loadingPagination = true;
      } else {
        state.messagesLoading = true;
      }
    })
    .addCase(getMessages.rejected, (state) => {
      state.error = 'error';
      state.messagesLoading = false;
      state.loadingPagination = false;
    });
};
