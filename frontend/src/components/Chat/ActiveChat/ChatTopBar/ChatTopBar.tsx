import { Box, Flex, Text } from '@chakra-ui/react';
import Avatar from '../../../Avatar/Avatar';
import { useAppSelector } from '../../../../redux/hooks';
import { Container, IsOnline, IsTyping, LastActive } from './Components';
import { useFriendStatusApproved } from '../../../../redux/chat/selectors';

const ChatTopBar = () => {
  const { name, online } = useAppSelector((state) => state.activeChatSlice);

  const friendStatusApproved = useFriendStatusApproved();

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
