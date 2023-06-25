import { Grid } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  LeftContainer,
  RightContainer,
} from '../../components/AppLayoutContainers';
import { SideBar, ActiveChat } from '../../components/Chat';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getMessages } from '../../services/messages/getMessages';
import { setActiveChat } from '../../redux/chat/chatSlice';
import { useFriend } from '../../redux/chat/selectors';

const ChatPage = () => {
  const { activeChat, friendId } = useAppSelector((state) => state.chatSlice);
  const findFriend = useFriend(friendId);
  const activeChatSelected = activeChat.uid;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeChatSelected) {
      dispatch(getMessages(activeChatSelected));
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
          lastActive: findFriend.user.lastActive,
          status: findFriend.status,
        })
      );
    }
  }, [dispatch, findFriend]);
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
            <ActiveChat.Messages />
            <ActiveChat.Input />
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
