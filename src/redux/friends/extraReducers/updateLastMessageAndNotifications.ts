import { AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ChatState } from '../../../types/chatState/chatState';
import {
  messageToServer,
  messageUI,
  serverMessageResponse,
} from '../../../types/message/message';
import { sanitizeMessage } from '../../../utils/sanitizeMessages';
import { updateLastMessage, updateNotification } from '../accions';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { formatDateMessage } from '../../../utils/date';

export const updateLastMessageAndNotifications = (
  builder: ActionReducerMapBuilder<ChatState>,
  sendMessages: AsyncThunk<serverMessageResponse, messageToServer, {}>
) => {
  builder
    // get messages
    .addCase(sendMessages.fulfilled, (state, action) => {
      const parsedMessage = sanitizeMessage(action.payload);
      state.friends = updateLastMessage(state.friends, parsedMessage);
      if (action.payload.from) {
        state.friends = updateNotification(state.friends, parsedMessage.from);
      }
    })
    .addCase(sendMessages.pending, (state, action) => {
      const payload: messageUI = {
        ...action.meta.arg,
        id: action.meta.requestId,
        responseTo: undefined,
        seen: false,
        date: new Date().toLocaleString(),
        parseDate: capitalizeFirstLetter(
          formatDateMessage(new Date().toLocaleString())
        ),
        isLoading: true,
      };

      state.friends = updateLastMessage(state.friends, payload);
    })

    .addCase(sendMessages.rejected, () => {
      // TODO REVISAR: hay que agregar prop has failed and loading
      // const findIndex = state.friends.findIndex(
      //   (fr) => fr.id === action.meta.requestId
      // );
      // state.friends[findIndex].lastMessage.hasFailed = true;
      // state.friends[findIndex].isLoading = false;
    });
};
