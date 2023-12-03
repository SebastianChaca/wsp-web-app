import { AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ChatState } from '../../../types/chatState/chatState';
import {
  messageToServer,
  messageUI,
  serverMessageResponse,
} from '../../../types/message/message';
import { sanitizeMessage } from '../../../utils/sanitizeMessages';

export const sendMessagesExtraReducer = (
  builder: ActionReducerMapBuilder<ChatState>,
  sendMessages: AsyncThunk<serverMessageResponse, messageToServer, {}>
) => {
  builder
    // get messages
    .addCase(sendMessages.fulfilled, (state, action) => {
      const parsedMessage = sanitizeMessage(action.payload);
      const findIndex = state.messages.findIndex(
        (msg) => msg.id === action.meta.requestId
      );
      state.messages.splice(findIndex, 1, parsedMessage);
    })
    .addCase(sendMessages.pending, (state, action) => {
      const payload: messageUI = {
        ...action.meta.arg,
        id: action.meta.requestId,
        responseTo: undefined,
        seen: false,
        date: new Date().toLocaleString(),
        isLoading: true,
      };

      state.messages.push(payload);
    })

    .addCase(sendMessages.rejected, (state, action) => {
      const findIndex = state.messages.findIndex(
        (msg) => msg.id === action.meta.requestId
      );
      state.messages[findIndex].hasFailed = true;
      state.messages[findIndex].isLoading = false;
    });
};
