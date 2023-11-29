import { createSlice } from '@reduxjs/toolkit';
import { refreshToken } from '../../services/session/refreshToken';
import { fetchSignIn, fetchSignUp } from '../../services/session/index';
import { sessionState } from '../../types/session/session';
import {
  refreshTokenExtraReducer,
  signInExtraReducer,
  signUpExtraReducer,
} from './extraReducers';

const initialState: sessionState = {
  token: null,
  email: null,
  error: null,
  name: '',
  uid: null,
  status: 'idle',
  isLoading: false,
  online: false,
  lastActive: '',
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signOut: (state) => {
      state.token = null;
      state.name = '';
      state.email = null;
      state.uid = null;
      state.status = 'idle';
      state.online = false;
    },
  },
  extraReducers: (builder) => {
    signInExtraReducer(builder, fetchSignIn);
    signUpExtraReducer(builder, fetchSignUp);
    refreshTokenExtraReducer(builder, refreshToken);
  },
});
export const { signOut } = sessionSlice.actions;

export default sessionSlice.reducer;
