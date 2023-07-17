import { useCallback, useMemo } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useSocketContext } from '../SocketContext/SocketContext';
import { message } from '../../types/message/message';

const useInputSocket = (messageProps: string) => {
  const { messages } = useAppSelector((state) => state.chatSlice);
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  const session = useAppSelector((state) => state.sessionSlice);
  const { socket } = useSocketContext();

  const msg: message = useMemo(
    () => ({
      from: session.uid,
      to: activeChat.uid,
      message: messageProps,
    }),
    [messageProps, session.uid, activeChat.uid]
  );
  const setTypingEvent = useCallback(() => {
    socket?.emit('typing', msg);
  }, [msg, socket]);

  const submitEvent = useCallback(() => {
    if (activeChat.status === 0 && !messages.length) {
      // chequeo si el estado de amistad esta pendiente, si es asi mando al destinatario
      // los datos del usuario que le esta escribiendo para agregarlo a su listao de amigos
      socket?.emit('request-friend', msg);
    }
    socket?.emit('personal-message', msg);
  }, [socket, msg, activeChat.status, messages]);

  const seenEvent = useCallback(() => {
    // filtrar los mensajes que me mandaron y que seen === false y mandarlos al back
    const notSeenMessages = messages.filter(
      (messg) => messg.from === activeChat.uid && !messg.seen
    );

    if (notSeenMessages.length > 0) {
      socket?.emit('seen-messages', notSeenMessages);
    }
  }, [messages, socket, activeChat.uid]);
  return { setTypingEvent, submitEvent, seenEvent };
};

export default useInputSocket;
