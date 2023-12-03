import {
  AsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { ChatState } from '../../../types/chatState/chatState';
import { messageUI } from '../../../types/message/message';

export const getMessagesExtraReducer = (
  builder: ActionReducerMapBuilder<ChatState>,
  getMessages: AsyncThunk<messageUI[], string, {}>
) => {
  builder
    // get messages
    .addCase(
      getMessages.fulfilled,
      (state, action: PayloadAction<messageUI[]>) => {
        state.messages = action.payload;
        state.messagesLoading = false;
      }
    )
    .addCase(getMessages.pending, (state, action) => {
      state.messagesLoading = true;
    })
    .addCase(getMessages.rejected, (state) => {
      state.error = 'error';
      state.messagesLoading = false;
    });
};
