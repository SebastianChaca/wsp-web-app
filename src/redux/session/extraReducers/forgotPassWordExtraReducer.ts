import {
  AsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { sessionState } from '../../../types/session/session';

export const forgotPasswordReducer = (
  builder: ActionReducerMapBuilder<sessionState>,
  forgotPassword: AsyncThunk<{ message: string }, { email: string }, {}>
) => {
  builder
    .addCase(forgotPassword.pending, (state) => {
      state.status = 'loading';
      state.isLoading = true;
    })
    .addCase(
      forgotPassword.fulfilled,
      (state, action: PayloadAction<{ message: string }>) => {
        state.status = 'idle';
        state.isLoading = false;
        state.forgotPasswordMessage = action.payload.message;
      }
    )
    .addCase(forgotPassword.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      state.isLoading = false;
    });
};
