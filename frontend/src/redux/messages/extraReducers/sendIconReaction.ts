import { AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { serverMessageResponse } from '../../../types/message/message';
import { sanitizeMessage } from '../../../utils/sanitizeMessages';

import { MessagesState } from '../../../types/MessagesState/messageSlicestate';

export const sendIconReactionExtraReducer = (
  builder: ActionReducerMapBuilder<MessagesState>,
  sendIconReaction: AsyncThunk<
    serverMessageResponse,
    {
      id: string;
      iconReactions: string;
    },
    {}
  >
) => {
  builder.addCase(sendIconReaction.fulfilled, (state, action) => {
    const parsedMessage = sanitizeMessage(action.payload);
    const findIndex = state.messages.findIndex(
      (msg) => msg.id === action.payload.id
    );
    state.messages[findIndex] = parsedMessage;
  });
};
