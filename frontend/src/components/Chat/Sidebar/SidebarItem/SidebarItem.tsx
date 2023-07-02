import { Box, Flex, Text } from '@chakra-ui/react';
import Avatar from '../../../Avatar/Avatar';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  resetNotifications,
  setFriendId,
} from '../../../../redux/chat/chatSlice';
import { friend as FriendInterface } from '../../../../types/friend/friend';
import { resetNotificationsAPI } from '../../../../services/notifications/resetNotifications';
import { SideBarItem } from './components';

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
    <Flex
      justifyContent="center"
      alignItems="center"
      _hover={{
        bg: selected ? 'gray.400' : 'gray.300',
      }}
      bg={selected ? 'gray.400' : 'transparent'}
      onClick={handleClick}
      cursor="pointer"
    >
      <Avatar
        online={online}
        name={name}
        hasBadge
        friendStatusApproved={friendStatusApproved}
      />
      <SideBarItem.UserInfoContainer>
        <Box>
          <Text fontSize="16px" fontWeight="600">
            {name}
          </Text>
          {friend.IsTyping ? (
            // TODO: componente
            'escribiendo'
          ) : (
            <SideBarItem.LastMessage
              lastMessage={friend.lastMessage}
              isOutgoing={friend.lastMessage.from === session.uid}
            />
          )}
        </Box>

        <Box>
          <SideBarItem.Date date={friend.lastMessage.date} />
          {/*
          TODO: agregar condicion que la tab este activa
          */}
          {friend.notifications > 0 && friend.uid !== activeChat.uid && (
            <SideBarItem.Notification notification={friend.notifications} />
          )}
        </Box>
      </SideBarItem.UserInfoContainer>
    </Flex>
  );
};

export default SidebarItem;
