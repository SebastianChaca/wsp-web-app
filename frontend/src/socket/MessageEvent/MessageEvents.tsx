import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  setMessages,
  updateSeenMessages,
  updateFriend,
  updateLastMessageSeenStatus,
  addFierndToList,
} from '../../redux/chat/chatSlice';
import { useSocketContext } from '../SocketContext/SocketContext';
import { serverMessageResponse } from '../../types/message/message';

import { sanitizeMessages } from '../../utils/sanitizeMessages';

import { getFriendById } from '../../services/friends';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
const MessageEvents = ({ children }: Props) => {
  const { socket } = useSocketContext();
  const session = useAppSelector((state) => state.sessionSlice);
  const { friends } = useAppSelector((state) => state.chatSlice);

  const dispatch = useAppDispatch();

  // mensaje personal
  useEffect(() => {
    const handlePersonalMessage = async (
      messagePayload: serverMessageResponse
    ) => {
      const findFriend = friends.find(
        (f) => f.user.uid === messagePayload.from.id
      );

      if (findFriend) {
        dispatch(setMessages(messagePayload));
      } else {
        const search = await getFriendById(messagePayload.from.id);

        dispatch(addFierndToList(search));
      }
    };
    socket?.on('personal-message', handlePersonalMessage);

    return () => {
      socket?.off('personal-message', handlePersonalMessage);
    };
  }, [socket, dispatch, friends]);

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
