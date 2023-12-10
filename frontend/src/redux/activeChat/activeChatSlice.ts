import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveChat } from '../../types/activeChat/activeChat';
import { messageUI } from '../../types/message/message';
import { responseTo } from './actions';

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
      return { ...action.payload };
    },
    setResponseTo: (state, action: PayloadAction<messageUI | null>) => {
      state.responseTo = responseTo(action.payload);
    },
    resetActiveChatState: () => initialState,
  },
});
export const { setActiveChat, setResponseTo, resetActiveChatState } =
  activeChatSlice.actions;

export default activeChatSlice.reducer;
