import { AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ChatState } from '../../../types/chatState/chatState';
import { friendFromApi } from '../../../types/friend/friend';

import { friendObjSanitize } from '../accions';

export const addFriendsExtraReducer = (
  builder: ActionReducerMapBuilder<ChatState>,
  addFriend: AsyncThunk<
    friendFromApi,
    {
      email: string;
    },
    {}
  >
) => {
  builder
    .addCase(addFriend.fulfilled, (state, action) => {
      // TODO:agregar type de action
      state.friends?.unshift(friendObjSanitize(action.payload));
      state.isLoading = false;
    })
    .addCase(addFriend.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addFriend.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
};
