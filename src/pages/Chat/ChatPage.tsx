import { Grid, Text, Fade, Flex, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  LeftContainer,
  RightContainer,
} from '../../components/AppLayoutContainers';
import { SideBar, ActiveChat } from '../../components/Chat';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getMessages } from '../../services/messages/getMessages';
import { useFriend } from '../../redux/friends/selectors';
import { setActiveChat } from '../../redux/activeChat/activeChatSlice';
import { getFriends } from '../../services/friends';
import { useSocketContext } from '../../socket/SocketContext/SocketContext';
import DropImage from '../../components/Chat/ActiveChat/Messages/components/DropImage/DropImage';

const ChatPage = () => {
  const { socketErrorConnection } = useSocketContext();
  const { isMobile } = useAppSelector((state) => state.uiSlice);
  const { friendId } = useAppSelector((state) => state.friendsSlice);
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  const findFriend = useFriend(friendId);

  const activeChatSelected = friendId;

  const dispatch = useAppDispatch();

  // TODO:cambiar el get de listado de amigos de socket a api rest aca
  useEffect(() => {
    dispatch(getFriends({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (activeChatSelected) {
      dispatch(
        getMessages({
          id: activeChatSelected,
          page: 1,
        })
      );
    }
  }, [activeChatSelected, dispatch]);

  useEffect(() => {
    if (findFriend) {
      dispatch(
        setActiveChat({
          isRequesting: findFriend.isRequesting,
          name: findFriend.user.name,
          email: findFriend.user.email,
          online: findFriend.user.online,
          uid: findFriend.user.uid,
          id: findFriend.user.id,
          lastActive: findFriend.user.lastActive,
          status: findFriend.status,
          isTyping: findFriend.isTyping,
          statusIsApproved: findFriend.statusIsApproved,
          statusIsBlocked: findFriend.statusIsBlocked,
          statusIsPending: findFriend.statusIsPending,
          responseTo: undefined,
        })
      );
    }
  }, [dispatch, findFriend]);

  if (socketErrorConnection) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Box textAlign="center">
          <Text fontSize="40px">Whoops ! Tech turbulence detected!</Text>
          <Text fontSize="20px">Refresh your app to restore tranquility.</Text>
        </Box>
      </Flex>
    );
  }
  if (isMobile) {
    return (
      <>
        {activeChat.id ? (
          <Fade in={!!activeChat.id}>
            <Grid templateColumns="100%" height="100vh" overflow="hidden">
              <RightContainer>
                <ActiveChat.TopBar />
                <DropImage>
                  <ActiveChat.Messages />
                  <ActiveChat.Input />
                </DropImage>
              </RightContainer>
            </Grid>
          </Fade>
        ) : (
          <>
            <SideBar.TopBar />
            <SideBar.FriendsList />
          </>
        )}
      </>
    );
  }
  return (
    <Grid templateColumns="30% 70%" height="100vh" overflow="hidden">
      <LeftContainer>
        {/*
        <LeftUtilitySidebar/>
        */}
        <SideBar.TopBar />
        <SideBar.FriendsList />
      </LeftContainer>

      <RightContainer>
        {activeChatSelected ? (
          <>
            <ActiveChat.TopBar />
            <DropImage>
              <ActiveChat.Messages />
              <ActiveChat.Input />
            </DropImage>
          </>
        ) : (
          <ActiveChat.EmptyState />
        )}
        {/*
        <RightUtilitySidebar/>
        */}
      </RightContainer>
    </Grid>
  );
};

export default ChatPage;
