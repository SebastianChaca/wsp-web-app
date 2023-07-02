import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveChat } from '../../types/activeChat/activeChat';
import { message } from '../../types/message/message';

const initialState: ActiveChat = {
  isRequesting: false,
  name: '',
  email: null,
  online: false,
  uid: null,
  isTyping: false,
  lastActive: '',
  status: null,
};

export const activeChatSlice = createSlice({
  name: 'activeChat',
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<ActiveChat>) => {
      const {
        isRequesting,
        name,
        email,
        online,
        uid,
        isTyping,
        lastActive,
        status,
      } = action.payload;
      state.isRequesting = isRequesting;
      state.name = name;
      state.email = email;
      state.online = online;
      state.uid = uid;
      state.isTyping = isTyping;
      state.lastActive = lastActive;
      state.status = status;
    },
  },
});
export const { setActiveChat } = activeChatSlice.actions;

export default activeChatSlice.reducer;
