import {
  AsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import {
  SessionAPIResponse,
  sessionState,
} from '../../../types/session/session';
import { SignUpProps } from '../../../services/session/signUp';

export const signUpExtraReducer = (
  builder: ActionReducerMapBuilder<sessionState>,
  fetchSignUp: AsyncThunk<SessionAPIResponse, SignUpProps, {}>
) => {
  builder
    .addCase(fetchSignUp.pending, (state) => {
      state.status = 'loading';
      state.isLoading = true;
    })
    .addCase(
      fetchSignUp.fulfilled,
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
    .addCase(fetchSignUp.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      state.isLoading = false;
    });
};
