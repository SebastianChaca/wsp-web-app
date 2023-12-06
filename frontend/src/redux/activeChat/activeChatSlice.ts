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
  id: null,
  isTyping: false,
  lastActive: '',
  status: null,
  statusIsApproved: false,
  statusIsBlocked: false,
  statusIsPending: false,
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
        statusIsBlocked,
        statusIsPending,
        responseTo,
        id,
      } = action.payload;

      state.isRequesting = isRequesting;
      state.name = name;
      state.email = email;
      state.online = online;
      state.uid = uid;
      state.id = id;
      state.isTyping = isTyping;
      state.lastActive = lastActive;
      state.status = status;
      state.statusIsApproved = statusIsApproved;
      state.statusIsBlocked = statusIsBlocked;
      state.statusIsPending = statusIsPending;
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
    resetActiveChatState: () => initialState,
  },
});
export const { setActiveChat, setResponseTo, resetActiveChatState } =
  activeChatSlice.actions;

export default activeChatSlice.reducer;
