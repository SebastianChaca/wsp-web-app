import {
  AsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { ChatState } from '../../../types/chatState/chatState';
import { PaginatedFriends, friendFromApi } from '../../../types/friend/friend';
import { updateFriendList } from '../accions/updateFriendsList';

export const getFriendsExtraReducer = (
  builder: ActionReducerMapBuilder<ChatState>,
  getFriends: AsyncThunk<PaginatedFriends, void, {}>
) => {
  builder
    .addCase(getFriends.fulfilled, (state, action) => {
      state.friends = updateFriendList(action.payload.friends);
      state.friendsLoading = false;
    })
    .addCase(getFriends.rejected, (state, action) => {
      state.friendsLoading = false;
      state.error = action.error.message!;
    });
};
