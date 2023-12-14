import { AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ChatState } from '../../../types/chatState/chatState';
import { PaginatedFriends } from '../../../types/friend/friend';
import { updateFriendList } from '../accions/updateFriendsList';

export const getFriendsExtraReducer = (
  builder: ActionReducerMapBuilder<ChatState>,
  getFriends: AsyncThunk<PaginatedFriends, { page: number }, {}>
) => {
  builder
    .addCase(getFriends.fulfilled, (state, action) => {
      const friends = updateFriendList(action.payload.friends);
      if (action.meta.arg.page > 1) {
        state.friends = [...state.friends, ...friends];
      } else {
        state.friends = friends;
      }
      state.pagination.currentPage = action.payload.currentPage;
      state.pagination.totalPages = action.payload.totalPages;
      state.pagination.loadingPagination = false;
      state.friendsLoading = false;
    })
    .addCase(getFriends.pending, (state) => {
      state.pagination.loadingPagination = true;
      state.friendsLoading = true;
    })
    .addCase(getFriends.rejected, (state, action) => {
      state.friendsLoading = false;
      state.error = action.error.message ?? null;
      state.pagination.loadingPagination = false;
    });
};
