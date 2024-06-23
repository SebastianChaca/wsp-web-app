import { AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import {
  messageToServer,
  messageUI,
  serverMessageResponse,
} from '../../../types/message/message';
import { sanitizeMessage } from '../../../utils/sanitizeMessages';

import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { formatDateMessage } from '../../../utils/date';
import { MessagesState } from '../../../types/MessagesState/messageSlicestate';

export const sendMessagesExtraReducer = (
  builder: ActionReducerMapBuilder<MessagesState>,
  sendMessages: AsyncThunk<
    serverMessageResponse,
    {
      message: messageToServer;
      imagePreview: ArrayBuffer | undefined | null | string;
    },
    {}
  >
) => {
  builder
    .addCase(sendMessages.fulfilled, (state, action) => {
      const parsedMessage = sanitizeMessage(action.payload);
      const findIndex = state.messages.findIndex(
        (msg) => msg.id === action.meta.requestId
      );
      state.messages.splice(findIndex, 1, parsedMessage);
    })
    .addCase(sendMessages.pending, (state, action) => {
      const payload: messageUI = {
        ...action.meta.arg.message,
        id: action.meta.requestId,
        responseTo: undefined,
        seen: false,
        date: new Date().toLocaleString(),
        parseDate: capitalizeFirstLetter(
          formatDateMessage(new Date().toLocaleString())
        ),
        isLoading: true,
        image: action.meta.arg.imagePreview,
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
