import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { AddFriend, AddFriendModal, Signout } from './MenuItems';
import AddFriendPopover from '../AddFriendPopover/AddFriendPopover';

const UserTopBarMenu = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <AddFriendModal isOpen={isOpen} onClose={onClose} />
      <Menu isLazy>
        {(props) => (
          <>
            <AddFriendPopover menuIsOpen={props.isOpen}>
              <MenuButton
                as={IconButton}
                icon={<FiChevronDown fontSize="24px" />}
                variant="outline"
              />
            </AddFriendPopover>

            <MenuList>
              <AddFriend onOpen={onOpen} />
              <Signout />
            </MenuList>
          </>
        )}
      </Menu>
    </>
  );
};

export default UserTopBarMenu;
