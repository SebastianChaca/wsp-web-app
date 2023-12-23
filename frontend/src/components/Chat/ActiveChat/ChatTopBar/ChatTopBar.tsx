import { Box, Flex, IconButton } from '@chakra-ui/react';
import { IoArrowBackSharp } from 'react-icons/io5';
import Avatar from '../../../Ui/Avatar/Avatar';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { Container } from './Components';
import { IsOnline, IsTyping, LastActive } from '../../../Ui/index';
import Username from '../../../Ui/UserName/Username';
import PaginationSpinner from './Components/PaginationSpinner/PaginationSpinner';
import { resetActiveChatState } from '../../../../redux/activeChat/activeChatSlice';

const ChatTopBar = () => {
  const { name, online, isTyping, statusIsApproved } = useAppSelector(
    (state) => state.activeChatSlice
  );
  const { isMobile } = useAppSelector((state) => state.uiSlice);
  const dispatch = useAppDispatch();

  return (
    <Container>
      <>
        {isMobile && (
          <IconButton
            aria-label="Go back"
            icon={<IoArrowBackSharp />}
            onClick={() => {
              dispatch(resetActiveChatState());
            }}
          />
        )}
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
        <Flex alignItems="start" justifyContent="right">
          <PaginationSpinner />
        </Flex>
      </>
    </Container>
  );
};

export default ChatTopBar;
