import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveChat } from '../../types/activeChat/activeChat';
import { messageUI } from '../../types/message/message';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

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
  responseTo: undefined,
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
        responseTo,
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
      state.responseTo = responseTo;
    },
    setResponseTo: (state, action: PayloadAction<messageUI | null>) => {
      if (action.payload) {
        const { to, from, emailTo, nameTo, date, message, id } = action.payload;
        state.responseTo = {
          to,
          from,
          date,
          emailTo,
          nameTo: nameTo && capitalizeFirstLetter(nameTo),
          message,
          id,
        };
      } else {
        state.responseTo = undefined;
      }
    },
  },
});
export const { setActiveChat, setResponseTo } = activeChatSlice.actions;

export default activeChatSlice.reducer;
