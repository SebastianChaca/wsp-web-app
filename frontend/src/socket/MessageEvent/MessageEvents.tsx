import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  setMessages,
  updateSeenMessages,
  updateFriend,
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
  const activeChat = useAppSelector((state) => state.activeChatSlice);

  const dispatch = useAppDispatch();

  // mensaje personal
  useEffect(() => {
    socket?.on('personal-message', (messagePayload: serverMessageResponse) => {
      const sanitMsg = sanitizeMessage(messagePayload);

      dispatch(setMessages(sanitMsg));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on('seen-messages', (messages: serverMessageResponse[]) => {
      const sanitize = sanitizeMessages(messages);
      dispatch(updateSeenMessages(sanitize.reverse()));
    });
  }, [socket, activeChat.uid, dispatch]);

  useEffect(() => {
    socket?.on('update-friend-status', (friend) => {
      dispatch(updateFriend(friend));
    });
  }, [socket, dispatch]);
  return <>{children}</>;
};

export default MessageEvents;
