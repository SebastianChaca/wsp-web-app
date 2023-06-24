import { Box, Flex, Text } from '@chakra-ui/react';
import Avatar from '../../Avatar/Avatar';
import { useAppSelector } from '../../../redux/hooks';
import { Container, IsOnline, IsTyping, LastActive } from './Components';
import { useFriendStatusApproved } from '../../../redux/chat/selectors';

const ChatTopBar = () => {
  const { activeChat } = useAppSelector((state) => state.chatSlice);
  const { name, online } = activeChat;
  const friendStatusApproved = useFriendStatusApproved();
  console.log(activeChat.status);

  return (
    <Container>
      <Flex alignItems="start" justifyContent="left">
        <Avatar
          online={online}
          name={name}
          hasBadge
          friendStatusApproved={friendStatusApproved}
        />
        <Box mt="2px">
          <Text fontSize="18px" fontWeight="600">
            {name}
          </Text>
          {friendStatusApproved && (
            <>
              <IsOnline />
              <LastActive />
              <IsTyping />
            </>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default ChatTopBar;
