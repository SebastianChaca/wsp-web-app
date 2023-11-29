import {
  AsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import {
  SessionAPIResponse,
  sessionState,
} from '../../../types/session/session';

export const refreshTokenExtraReducer = (
  builder: ActionReducerMapBuilder<sessionState>,
  refreshToken: AsyncThunk<SessionAPIResponse, void, {}>
) => {
  builder
    .addCase(refreshToken.pending, (state) => {
      state.status = 'loading';
      state.isLoading = true;
    })
    .addCase(
      refreshToken.fulfilled,
      (state, action: PayloadAction<SessionAPIResponse>) => {
        state.status = 'idle';
        state.token = action.payload.token;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.uid = action.payload.user.id;
        state.isLoading = false;
        state.online = true;
      }
    )
    .addCase(refreshToken.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      state.isLoading = false;
    });
};
