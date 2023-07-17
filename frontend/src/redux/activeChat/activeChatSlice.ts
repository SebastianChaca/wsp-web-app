import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveChat } from '../../types/activeChat/activeChat';
import { messageUI } from '../../types/message/message';

const initialState: ActiveChat = {
  isRequesting: false,
  name: '',
  email: '',
  online: false,
  uid: null,
  isTyping: false,
  lastActive: '',
  status: null,
  statusIsApproved: false,
  responseTo: {
    to: null,
    from: null,
    message: null,
    seen: false,
    date: '',
    id: '',
    parseDate: null,
    nameTo: undefined,
    emailTo: undefined,
  },
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
    setResponseTo: (state, action: PayloadAction<messageUI>) => {
      state.responseTo = action.payload;
    },
  },
});
export const { setActiveChat, setResponseTo } = activeChatSlice.actions;

export default activeChatSlice.reducer;
