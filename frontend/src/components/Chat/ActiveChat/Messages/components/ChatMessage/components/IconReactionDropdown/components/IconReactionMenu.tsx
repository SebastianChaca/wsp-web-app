import { Menu, MenuButton, MenuList, IconButton } from '@chakra-ui/react';
import { IconReactionButton, IconReactionList } from '.';
import { useMessageContext } from '../../Provider/MessageProvider';

const IconReactionManu = () => {
  const { openIconReactionDropDown, setIconReactionDropDown } =
    useMessageContext();

  return (
    <Menu
      placement="top"
      offset={[0, 0]}
      isLazy
      isOpen={openIconReactionDropDown}
      onOpen={() => setIconReactionDropDown(true)}
      onClose={() => setIconReactionDropDown(false)}
    >
      <MenuButton
        as={IconButton}
        icon={<IconReactionButton />}
        bg="none"
        _active={{ bg: 'none' }}
      />
      <MenuList
        bg="none"
        shadow="0px"
        border="none"
        minWidth="100%"
        p="0px"
        zIndex={0}
      >
        <IconReactionList />
      </MenuList>
    </Menu>
  );
};

export default IconReactionManu;
