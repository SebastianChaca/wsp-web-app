import { useEffect } from 'react';
import { useSocketContext } from '../SocketContext/SocketContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addFierndToList,
  setFriendsList,
  updateFriendStatus,
} from '../../redux/chat/chatSlice';
import { friend } from '../../types/session/session';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
const SidebarEvents = ({ children }: Props) => {
  const { socket } = useSocketContext();
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector((state) => state.sessionSlice);

  // lista de amigos
  useEffect(() => {
    socket?.on('friend-list', (friends: friend[]) => {
      dispatch(setFriendsList(friends));
    });
  }, [socket, dispatch, uid]);

  useEffect(() => {
    // online / offline
    socket?.on(
      'friend-status',
      (friendStatus: { uid: string; online: boolean }) => {
        dispatch(updateFriendStatus(friendStatus));
      }
    );
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on('request-friend', ({ friendInfo }: { friendInfo: friend }) => {
      dispatch(addFierndToList(friendInfo));
    });
  }, [socket, dispatch]);

  return <>{children}</>;
};

export default SidebarEvents;
