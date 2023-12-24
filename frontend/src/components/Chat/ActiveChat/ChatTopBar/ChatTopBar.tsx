import { Box, Flex } from '@chakra-ui/react';
import Avatar from '../../../Ui/Avatar/Avatar';
import { useAppSelector } from '../../../../redux/hooks';
import { Container, MobileReturnBtn } from './Components';
import { IsOnline, IsTyping, LastActive } from '../../../Ui/index';
import Username from '../../../Ui/UserName/Username';
import PaginationSpinner from './Components/PaginationSpinner/PaginationSpinner';

const ChatTopBar = () => {
  const { name, online, isTyping, statusIsApproved } = useAppSelector(
    (state) => state.activeChatSlice
  );

  return (
    <Container>
      <>
        <Flex alignItems="start" justifyContent="left" w="100%">
          <Avatar
            online={online}
            name={name}
            hasBadge
            friendStatusApproved={statusIsApproved}
          />
          <Box mt="2px">
            <Username name={name} />
            {statusIsApproved && (
              <>
                <IsOnline />
                <LastActive />
                <IsTyping isTyping={isTyping} />
              </>
            )}
          </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="right">
          <PaginationSpinner />
          <MobileReturnBtn />
        </Flex>
      </>
    </Container>
  );
};

export default ChatTopBar;
