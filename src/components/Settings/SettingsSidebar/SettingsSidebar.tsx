import { IoChatbubblesOutline } from 'react-icons/io5';
import { Flex, IconButton } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CgLogOut } from 'react-icons/cg';
import { GrSettingsOption } from 'react-icons/gr';
import { useAppDispatch } from '../../../redux/hooks';
import { signOut } from '../../../redux/session/sessionSlice';
import { resetActiveChatState } from '../../../redux/activeChat/activeChatSlice';
import { resetChatState } from '../../../redux/friends/friendsSlice';
import { removeUser } from '../../../services/session/utils/setUser';
import { AddFriend } from './components';

const SettingsSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
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
      <Flex flexDirection="column" alignContent="center">
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
      </Flex>
      <Flex flexDirection="column" alignContent="center">
        <IconButton
          icon={<CgLogOut size="35px" />}
          onClick={handleSignOut}
          aria-label="singout"
          bg="transparent"
        />
        <IconButton
          padding="10px"
          aria-label="settings"
          bg={pathName === '/settings' ? 'brand.gray' : 'transparent'}
          icon={<GrSettingsOption size="35px" />}
          onClick={() => {
            navigate('/settings');
          }}
        />
      </Flex>
    </Flex>
  );
};

export default SettingsSidebar;
