import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useSocketContext } from '../SocketContext/SocketContext';
import { messageToServer } from '../../types/message/message';

import { sendMessage } from '../../services/messages';

const useInputSocket = (messageProps: string) => {
  const { messages } = useAppSelector((state) => state.chatSlice);
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  const session = useAppSelector((state) => state.sessionSlice);
  const dispatch = useAppDispatch();
  const { socket } = useSocketContext();

  const msg: messageToServer = useMemo(
    () => ({
      from: session.uid ?? '',
      to: activeChat.uid ?? '',
      message: messageProps,
      responseTo: activeChat.responseTo?.id,
    }),
    [messageProps, session.uid, activeChat.uid, activeChat.responseTo?.id]
  );
  const setTypingEvent = useCallback(() => {
    socket?.emit('typing', msg);
  }, [msg, socket]);

  const submitEvent = useCallback(async () => {
    // TODO: si no se mandaron mensajes tengo que agregar al remitente a la lista del destinatario
    if (activeChat.status === 0 && !messages.length) {
      // chequeo si el estado de amistad esta pendiente, si es asi mando al destinatario
      // los datos del usuario que le esta escribiendo para agregarlo a su listao de amigos
      // socket?.emit('request-friend', msg);
    }

    dispatch(sendMessage(msg));

    // socket?.emit('personal-message', msg);
  }, [dispatch, msg, activeChat.status, messages.length]);

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
