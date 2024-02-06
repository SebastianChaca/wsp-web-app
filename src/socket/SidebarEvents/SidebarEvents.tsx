import { useEffect } from 'react';
import { useSocketContext } from '../SocketContext/SocketContext';
import { useAppDispatch } from '../../redux/hooks';
import {
  setFriendIsTyping,
  updateFriendStatus,
} from '../../redux/friends/friendsSlice';
import { message } from '../../types/message/message';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
const SidebarEvents = ({ children }: Props) => {
  const { socket } = useSocketContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // online / offline and last active
    socket?.on(
      'friend-online-status',
      (friendStatus: { uid: string; online: boolean }) => {
        dispatch(updateFriendStatus(friendStatus));
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
