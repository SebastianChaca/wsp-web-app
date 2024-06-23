import { IoChatbubblesOutline } from 'react-icons/io5';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CgLogOut } from 'react-icons/cg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Avatar } from '../Ui';
import { AddFriend } from './components';
import { signOut } from '../../redux/session/sessionSlice';
import { resetActiveChatState } from '../../redux/activeChat/activeChatSlice';
import { resetChatState } from '../../redux/friends/friendsSlice';
import { removeUser } from '../../services/session/utils/setUser';

const SettingsSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname;
  const { name } = useAppSelector((state) => state.sessionSlice);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    // TODO:revisar, cuando salgo y entro veo un blinkeo de los mensajes anteriores
    dispatch(signOut());
    dispatch(resetActiveChatState());
    dispatch(resetChatState());
    removeUser();
  };
  return (
    <Flex
      flexDirection="column"
      padding="10px 10px 20px 10px"
      alignItems="center"
      height="100vh"
      justifyContent="space-between"
    >
      <Box>
        <IconButton
          icon={<IoChatbubblesOutline size="35px" />}
          aria-label="messages"
          margin="8px"
          padding="10px"
          bg={pathName === '/chat' ? 'brand.gray' : 'transparent'}
          onClick={() => {
            navigate('/chat');
          }}
        />

        <AddFriend />
      </Box>
      <IconButton
        icon={<CgLogOut size="35px" />}
        onClick={handleSignOut}
        aria-label="singout"
        bg="transparent"
      />

      {/* <Avatar name={name} /> */}
    </Flex>
  );
};

export default SettingsSidebar;
