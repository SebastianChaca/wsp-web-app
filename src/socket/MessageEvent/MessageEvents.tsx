import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  setLastMessageAndNotification,
  updateFriend,
  updateLastMessageSeenStatus,
  addFierndToList,
} from '../../redux/friends/friendsSlice';
import { useSocketContext } from '../SocketContext/SocketContext';
import { serverMessageResponse } from '../../types/message/message';
import {
  sanitizeMessage,
  sanitizeMessages,
} from '../../utils/sanitizeMessages';
import { getFriendById } from '../../services/friends';
import { friendFromApi } from '../../types/friend/friend';
import {
  setMessage,
  updateMessage,
  updateSeenMessages,
} from '../../redux/messages/messagesSlice';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
const MessageEvents = ({ children }: Props) => {
  const { socket } = useSocketContext();
  const session = useAppSelector((state) => state.sessionSlice);
  const { friends } = useAppSelector((state) => state.friendsSlice);
  const activeChat = useAppSelector((state) => state.activeChatSlice);

  const dispatch = useAppDispatch();

  // mensaje personal
  useEffect(() => {
    const handlePersonalMessage = async (
      messagePayload: serverMessageResponse
    ) => {
      const findFriend = friends.find(
        (f) => f.user.id === messagePayload.from.id
      );

      if (findFriend) {
        if (
          activeChat.id === messagePayload.from.id ||
          activeChat.id === messagePayload.to.id
        ) {
          dispatch(setMessage(messagePayload));
        }
        dispatch(setLastMessageAndNotification(messagePayload));
      } else {
        const search = await getFriendById(messagePayload.from.id);
        dispatch(addFierndToList(search));
      }
    };

    socket?.on('personal-message', handlePersonalMessage);

    return () => {
      socket?.off('personal-message', handlePersonalMessage);
    };
  }, [socket, dispatch, friends, activeChat.id]);

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

  useEffect(() => {
    const handleIconReaction = (payload: serverMessageResponse) => {
      const sanitize = sanitizeMessage(payload);

      dispatch(updateMessage(sanitize));
    };
    socket?.on('update-message-reaction', handleIconReaction);

    return () => {
      socket?.off('update-message-reaction', handleIconReaction);
    };
  }, [socket, dispatch]);
  return <>{children}</>;
};

export default MessageEvents;
