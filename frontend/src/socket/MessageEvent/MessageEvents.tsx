import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  setMessages,
  updateSeenMessages,
  updateFriend,
  updateLastMessageSeenStatus,
} from '../../redux/chat/chatSlice';
import { useSocketContext } from '../SocketContext/SocketContext';
import { serverMessageResponse } from '../../types/message/message';

import {
  sanitizeMessages,
  sanitizeMessage,
} from '../../utils/sanitizeMessages';
// import { setIsTyping } from '../../redux/activeChat/activeChatSlice';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
const MessageEvents = ({ children }: Props) => {
  const { socket } = useSocketContext();
  const session = useAppSelector((state) => state.sessionSlice);

  const dispatch = useAppDispatch();

  // mensaje personal
  useEffect(() => {
    socket?.on('personal-message', (messagePayload: serverMessageResponse) => {
      console.log(messagePayload);
      const sanitMsg = sanitizeMessage(messagePayload);
      dispatch(setMessages(sanitMsg));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on('seen-messages', (messagesPayload: serverMessageResponse[]) => {
      const sanitize = sanitizeMessages(messagesPayload).reverse();

      dispatch(updateSeenMessages(sanitize));
      dispatch(updateLastMessageSeenStatus(sanitize[0]));
    });
  }, [socket, dispatch, session.uid]);

  useEffect(() => {
    socket?.on('update-friend-status', (friend) => {
      dispatch(updateFriend(friend));
    });
  }, [socket, dispatch]);
  return <>{children}</>;
};

export default MessageEvents;
