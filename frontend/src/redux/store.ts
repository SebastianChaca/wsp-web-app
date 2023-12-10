import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import {
  sessionSlice,
  friendsSlice,
  activeChatSlice,
  messagesSlice,
} from './index';

export const store = configureStore({
  reducer: {
    sessionSlice,
    friendsSlice,
    activeChatSlice,
    messagesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
