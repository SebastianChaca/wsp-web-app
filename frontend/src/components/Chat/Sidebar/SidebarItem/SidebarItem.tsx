import { useEffect } from 'react';
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

  // useEffect(()=>{
  //   if(!selected){

  //   }
  // })

  const handleClick = async () => {
    if (uid) {
      dispatch(setFriendId(uid));
      // seteo notificaciones recibidas en 0 en la UI
      dispatch(resetNotifications({ uid }));
      // seteo notificaciones recibidas en 0 en la bd
      await resetNotificationsAPI(uid);
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
          {/* <SideBarItem.NotificationSound friend={friend} /> */}
          <SideBarItem.Date date={friend.lastMessage?.date} />
          {/* todo: ver logica de active tab */}
          {!selected && (
            <SideBarItem.Notification notification={friend.notifications} />
          )}
        </Box>
      </SideBarItem.UserInfoContainer>
    </SideBarItem.ItemContainer>
  );
};

export default SidebarItem;
