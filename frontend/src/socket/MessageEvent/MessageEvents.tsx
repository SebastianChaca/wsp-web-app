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
import { friendFromApi } from '../../types/friend/friend';

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
    const handleSeenMessage = (messagesPayload: serverMessageResponse[]) => {
      const sanitize = sanitizeMessages(messagesPayload);

      dispatch(updateSeenMessages(sanitize));
      dispatch(updateLastMessageSeenStatus(sanitize[0]));
    };
    socket?.on('seen-messages', handleSeenMessage);
    return () => {
      socket?.off('personal-message', handleSeenMessage);
    };
  }, [socket, dispatch, session.uid]);

  useEffect(() => {
    const handleUpdate = (friend: friendFromApi) => {
      dispatch(updateFriend(friend));
    };
    socket?.on('update-friend-status', handleUpdate);
    return () => {
      socket?.off('update-friend-status', handleUpdate);
    };
  }, [socket, dispatch]);
  return <>{children}</>;
};

export default MessageEvents;
