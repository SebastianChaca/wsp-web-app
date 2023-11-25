import { useEffect } from 'react';
import { useSocketContext } from '../SocketContext/SocketContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addFierndToList,
  setFriendIsTyping,
  setFriendsList,
  updateFriendStatus,
} from '../../redux/chat/chatSlice';
import { friendsAPIResponse, friendFromApi } from '../../types/friend/friend';
import { message } from '../../types/message/message';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
const SidebarEvents = ({ children }: Props) => {
  const { socket } = useSocketContext();
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector((state) => state.sessionSlice);

  // lista de amigos
  // useEffect(() => {
  //   socket?.on('friend-list', (friends: friendsAPIResponse) => {
  //     dispatch(setFriendsList(friends));
  //   });
  // }, [socket, dispatch, uid]);

  useEffect(() => {
    // online / offline
    socket?.on(
      'friend-status',
      (friendStatus: { uid: string; online: boolean }) => {
        // TODO: aca habria que actualizar todo el objecto de friend en vez de solo el online booleano
        dispatch(updateFriendStatus(friendStatus));
      }
    );
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on(
      'request-friend',
      ({ friendInfo }: { friendInfo: friendFromApi }) => {
        dispatch(addFierndToList(friendInfo));
      }
    );
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on('typing', (messagePayload: message) => {
      dispatch(setFriendIsTyping(messagePayload));
    });
  }, [socket, dispatch]);

  return <>{children}</>;
};

export default SidebarEvents;
