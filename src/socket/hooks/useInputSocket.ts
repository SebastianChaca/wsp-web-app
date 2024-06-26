import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useSocketContext } from '../SocketContext/SocketContext';
import { messageToServer } from '../../types/message/message';

import { sendMessage, updateSeenMessage } from '../../services/messages';
import { updateFriendship } from '../../services/friends/updateFrienship';
import useToastCustom from '../../hooks/useToastCustom';

const useInputSocket = (
  messageProps: string | null,
  image?: string,
  preview?: ArrayBuffer | undefined | null | string
) => {
  const { messages } = useAppSelector((state) => state.messagesSlice);
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  const session = useAppSelector((state) => state.sessionSlice);
  const dispatch = useAppDispatch();
  const { socket } = useSocketContext();
  const { errorToast } = useToastCustom();

  const msg: messageToServer = useMemo(
    () => ({
      from: session.uid ?? '',
      to: activeChat.uid ?? '',
      message: messageProps?.length === 0 ? null : messageProps,
      responseTo: activeChat.responseTo?.id,
      image,
    }),
    [
      messageProps,
      session.uid,
      activeChat.uid,
      activeChat.responseTo?.id,
      image,
    ]
  );
  const setTypingEvent = useCallback(() => {
    socket?.emit('typing', msg);
  }, [msg, socket]);
  console.log(image);
  const submitEvent = useCallback(async () => {
    try {
      if (activeChat.status === 0 && !messages.length) {
        await updateFriendship({ friendId: msg.to });
      }

      dispatch(sendMessage({ message: msg, imagePreview: preview }));
    } catch (error) {
      errorToast();
    }

    // socket?.emit('personal-message', msg);
  }, [dispatch, msg, activeChat.status, messages.length, errorToast, preview]);

  const seenEvent = useCallback(async () => {
    // filtrar los mensajes que me mandaron y que seen === false y mandarlos al back
    const notSeenMessages = messages
      .filter((messg) => messg.from === activeChat.id && !messg.seen)
      .map((messg) => messg.id);

    if (notSeenMessages.length > 0 && activeChat.id) {
      await updateSeenMessage(activeChat.id, notSeenMessages);
    }
  }, [messages, activeChat.id]);
  return { setTypingEvent, submitEvent, seenEvent };
};

export default useInputSocket;
