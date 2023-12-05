import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useSocketContext } from '../SocketContext/SocketContext';
import { messageToServer } from '../../types/message/message';

import { sendMessage } from '../../services/messages';
import { updateFriendship } from '../../services/friends/updateFrienship';

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
    try {
      if (activeChat.status === 0 && !messages.length) {
        await updateFriendship({ friendId: msg.to });
      }
      dispatch(sendMessage(msg));
    } catch (error) {
      console.log(error);
    }

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
