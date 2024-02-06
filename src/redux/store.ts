import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import {
  sessionSlice,
  friendsSlice,
  activeChatSlice,
  messagesSlice,
  uiSlice,
} from './index';

export const store = configureStore({
  reducer: {
    sessionSlice,
    friendsSlice,
    activeChatSlice,
    messagesSlice,
    uiSlice,
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
