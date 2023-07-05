import { Box, Flex } from '@chakra-ui/react';
import Avatar from '../../../UserComponents/Avatar/Avatar';
import { useAppSelector } from '../../../../redux/hooks';
import { Container } from './Components';
import { IsOnline, IsTyping, LastActive } from '../../../UserComponents/index';
import { useFriendStatusApproved } from '../../../../redux/chat/selectors';
import Username from '../../../UserComponents/UserName/Username';

const ChatTopBar = () => {
  const { name, online, isTyping } = useAppSelector(
    (state) => state.activeChatSlice
  );

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
          <Username name={name} />
          {friendStatusApproved && (
            <>
              <IsOnline />
              <LastActive />
              <IsTyping isTyping={isTyping} />
            </>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default ChatTopBar;
