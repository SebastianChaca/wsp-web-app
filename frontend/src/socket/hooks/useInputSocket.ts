import { useCallback, useMemo } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useSocketContext } from '../SocketContext/SocketContext';
import { message } from '../../types/message/message';

const useInputSocket = (messageProps: string) => {
  const { activeChat, messages } = useAppSelector((state) => state.chatSlice);
  const { uid } = useAppSelector((state) => state.sessionSlice);
  const { socket } = useSocketContext();

  const msg: message = useMemo(() => ({
    from: uid,
    to: activeChat.uid,
    message: messageProps,
  }), [messageProps, uid, activeChat.uid]);
  const setTypingEvent = useCallback(() => {
    socket?.emit('typing', msg);
  }, [msg, socket]);

  const submitEvent = useCallback(() => {
    socket?.emit('personal-message', msg);
  }, [socket, msg]);

  const seenEvent = useCallback(() => {
    // filtrar los mensajes que me mandaron y que seen === false y mandarlos al back
    const notSeenMessages = messages.filter(
      (messg) => msg.to === uid && !messg.seen,
    );

    if (notSeenMessages.length > 0) {
      socket?.emit('seen-messages', notSeenMessages);
    }
  }, [messages, socket, uid, msg.to]);
  return { setTypingEvent, submitEvent, seenEvent };
};

export default useInputSocket;
