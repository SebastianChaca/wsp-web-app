import { useEffect, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  resetNotifications,
  setFriendId,
} from '../../../../redux/chat/chatSlice';
import { friend as FriendInterface } from '../../../../types/friend/friend';
import { resetNotificationsAPI } from '../../../../services/notifications/resetNotifications';
import { Item } from './components';
import useActiveTab from '../../../../hooks/useActiveTab';

interface Props {
  friend: FriendInterface;
}
const SidebarItem = ({ friend }: Props) => {
  const { uid } = friend.user;
  const dispatch = useAppDispatch();
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  const selected = activeChat.uid === uid;
  const isTabActive = useActiveTab();
  const resetNotif = useCallback(async () => {
    if (uid) {
      dispatch(resetNotifications({ uid }));
      await resetNotificationsAPI(uid);
    }
  }, [uid, dispatch]);

  // useEffect(() => {
  //   if (!selected && friend.lastMessage.seen && friend.notifications > 0) {
  //     resetNotif();
  //   }
  // }, [dispatch, friend, selected, uid, resetNotif]);

  // useEffect(() => {
  //   if (isTabActive && selected) {
  //     resetNotif();
  //   }
  // }, [selected, isTabActive, resetNotif]);

  const handleClick = async () => {
    if (uid) {
      dispatch(setFriendId(uid));
    }
  };

  return (
    <Item.Provider friend={friend}>
      <Item.Container selected={selected} handleClick={handleClick}>
        <Item.Avatar />
        <Item.UserInfoContainer>
          <Box>
            <Item.UserName />
            <Item.IsTyping />
            <Item.LastMessage />
          </Box>

          <Box>
            <Item.Date />
            {(!selected || !isTabActive) && (
              <>
                <Item.NotificationSound />
                <Item.Notification />
              </>
            )}
          </Box>
        </Item.UserInfoContainer>
      </Item.Container>
    </Item.Provider>
  );
};

export default SidebarItem;
