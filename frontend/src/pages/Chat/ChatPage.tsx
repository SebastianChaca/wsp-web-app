import { Grid } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  LeftContainer,
  RightContainer,
} from '../../components/AppLayoutContainers';
import { SideBar, ActiveChat } from '../../components/Chat';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getMessages } from '../../services/messages/getMessages';

import { useFriend } from '../../redux/chat/selectors';
import { setActiveChat } from '../../redux/activeChat/activeChatSlice';

const ChatPage = () => {
  const { friendId } = useAppSelector((state) => state.chatSlice);
  const findFriend = useFriend(friendId);
  console.log(findFriend?.statusIsApproved);
  const activeChatSelected = friendId;

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
          isTyping: findFriend.IsTyping,
          statusIsApproved: findFriend.statusIsApproved,
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
