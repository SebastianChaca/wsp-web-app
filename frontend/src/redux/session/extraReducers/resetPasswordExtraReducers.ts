import {
  AsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import {
  SessionAPIResponse,
  sessionState,
} from '../../../types/session/session';

export const resetPasswordReducer = (
  builder: ActionReducerMapBuilder<sessionState>,
  resetPassword: AsyncThunk<
    SessionAPIResponse,
    { token: string; password: string },
    {}
  >
) => {
  builder
    .addCase(resetPassword.pending, (state) => {
      state.status = 'loading';
      state.isLoading = true;
    })
    .addCase(
      resetPassword.fulfilled,
      (state, action: PayloadAction<SessionAPIResponse>) => {
        state.status = 'idle';
        state.token = action.payload.token;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.uid = action.payload.user.id;
        state.id = action.payload.user.id;
        state.isLoading = false;
        state.online = true;
        state.forgotPasswordMessage = '';
      }
    )
    .addCase(resetPassword.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      state.isLoading = false;
    });
};
