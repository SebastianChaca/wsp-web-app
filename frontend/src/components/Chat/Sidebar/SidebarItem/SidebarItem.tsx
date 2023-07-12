import { useEffect, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  resetNotifications,
  setFriendId,
} from '../../../../redux/chat/chatSlice';
import { friend as FriendInterface } from '../../../../types/friend/friend';
import { resetNotificationsAPI } from '../../../../services/notifications/resetNotifications';
import { SideBarItem } from './components';
import { IsTyping, UserName, Avatar } from '../../../UserComponents';
import useActiveTab from '../../../../hooks/useActiveTab';

interface Props {
  friend: FriendInterface;
}
const SidebarItem = ({ friend }: Props) => {
  const { name, uid, online } = friend.user;
  const dispatch = useAppDispatch();
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  const session = useAppSelector((state) => state.sessionSlice);
  const friendStatusApproved = friend.status === 1;
  const selected = activeChat.uid === uid;
  const isTabActive = useActiveTab();
  const resetNotif = useCallback(async () => {
    if (uid) {
      dispatch(resetNotifications({ uid }));
      await resetNotificationsAPI(uid);
    }
  }, [uid, dispatch]);

  useEffect(() => {
    if (!selected && friend.lastMessage.seen && friend.notifications > 0) {
      resetNotif();
    }
  }, [dispatch, friend, selected, uid, resetNotif]);

  useEffect(() => {
    if (isTabActive && selected) {
      resetNotif();
    }
  }, [selected, isTabActive, resetNotif]);

  const handleClick = async () => {
    if (uid) {
      dispatch(setFriendId(uid));
    }
  };

  return (
    <SideBarItem.ItemContainer selected={selected} handleClick={handleClick}>
      <Avatar
        online={online}
        name={name}
        hasBadge
        friendStatusApproved={friendStatusApproved}
      />
      <SideBarItem.UserInfoContainer>
        <Box>
          <UserName name={name} />
          {friend.IsTyping ? (
            <IsTyping isTyping={friend.IsTyping} />
          ) : (
            <SideBarItem.LastMessage
              lastMessage={friend.lastMessage}
              isOutgoing={friend.lastMessage?.from === session.uid}
            />
          )}
        </Box>

        <Box>
          <SideBarItem.Date date={friend.lastMessage?.date} />

          {(!selected || !isTabActive) && (
            <>
              <SideBarItem.NotificationSound friend={friend} />
              <SideBarItem.Notification notification={friend.notifications} />
            </>
          )}
        </Box>
      </SideBarItem.UserInfoContainer>
    </SideBarItem.ItemContainer>
  );
};

export default SidebarItem;
