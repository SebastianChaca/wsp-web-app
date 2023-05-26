import { Box, Flex, Text } from '@chakra-ui/react';
import Avatar from '../../Avatar/Avatar';
import { useAppSelector } from '../../../redux/hooks';
import { Container, IsOnline, IsTyping, LastActive } from './Components';

const ChatTopBar = () => {
  const { activeChat } = useAppSelector((state) => state.chatSlice);
  const { name, online } = activeChat;

  return (
    <Container>
      <Flex alignItems="start" justifyContent="left">
        <Avatar online={online} name={name} hasBadge />
        <Box mt="2px">
          <Text fontSize="18px" fontWeight="600">
            {name}
          </Text>
          <IsOnline />
          <LastActive />
          <IsTyping />
        </Box>
      </Flex>
    </Container>
  );
};

export default ChatTopBar;
