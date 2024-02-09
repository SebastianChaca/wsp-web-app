import {
  AsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import {
  SessionAPIResponse,
  sessionState,
} from '../../../types/session/session';
import { SignInProps } from '../../../services/session/signIn';

export const signInExtraReducer = (
  builder: ActionReducerMapBuilder<sessionState>,
  fetchSignIn: AsyncThunk<SessionAPIResponse, SignInProps, {}>
) => {
  builder
    .addCase(fetchSignIn.pending, (state) => {
      state.status = 'loading';
      state.isLoading = true;
    })
    .addCase(
      fetchSignIn.fulfilled,
      (state, action: PayloadAction<SessionAPIResponse>) => {
        state.status = 'idle';
        state.token = action.payload.token;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.uid = action.payload.user.id;
        state.id = action.payload.user.id;
        state.isLoading = false;
        state.online = true;
      }
    )
    .addCase(fetchSignIn.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string | string[];
      state.isLoading = false;
    });
};
