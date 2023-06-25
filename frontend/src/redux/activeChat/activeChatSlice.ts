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
    setIsTyping: (state, action: PayloadAction<message>) => {
      if (action.payload.message.length > 0) {
        if (
          state.uid === action.payload.to ||
          state.uid === action.payload.from
        ) {
          state.isTyping = true;
        }
      } else {
        state.isTyping = false;
      }
    },
  },
});
export const { setActiveChat, setIsTyping } = activeChatSlice.actions;

export default activeChatSlice.reducer;
