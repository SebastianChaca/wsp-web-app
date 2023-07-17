import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveChat } from '../../types/activeChat/activeChat';

const initialState: ActiveChat = {
  isRequesting: false,
  name: '',
  email: null,
  online: false,
  uid: null,
  isTyping: false,
  lastActive: '',
  status: null,
  statusIsApproved: false,
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
        statusIsApproved,
      } = action.payload;
      state.isRequesting = isRequesting;
      state.name = name;
      state.email = email;
      state.online = online;
      state.uid = uid;
      state.isTyping = isTyping;
      state.lastActive = lastActive;
      state.status = status;
      state.statusIsApproved = statusIsApproved;
    },
  },
});
export const { setActiveChat } = activeChatSlice.actions;

export default activeChatSlice.reducer;
