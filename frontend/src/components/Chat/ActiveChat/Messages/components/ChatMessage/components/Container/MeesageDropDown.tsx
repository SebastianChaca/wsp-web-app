import React, { FC } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/all';
import { createPortal } from 'react-dom';
import { useMessageContext } from '../Provider/MessageProvider';

const MeesageDropDown: FC = () => {
  const { isOutgoing, showDropDown, setShowDropDown, activeChat } =
    useMessageContext();

  if (isOutgoing || !activeChat.statusIsApproved) {
    return null;
  }
  return (
    <Menu isLazy>
      {({ isOpen }) => (
        <>
          {(showDropDown || isOpen) && (
            <MenuButton
              position="absolute"
              top={-2}
              right={0}
              bg="message.in.bg"
              _hover={{ bg: 'message.in.bg', w: '10px' }}
              // _active={{
              //   bg: 'message.in.bg',
              //   h: '10px',
              // }}
              as={IconButton}
              icon={<BiChevronDown size={20} />}
              variant="ghost"
            />
          )}
          {createPortal(
            <>
              <MenuList
                onMouseEnter={() => setShowDropDown(true)}
                position="absolute"
                top={-5}
                left={5}
              >
                <MenuItem>Responder</MenuItem>
              </MenuList>
            </>,
            document.body
          )}
        </>
      )}
    </Menu>
  );
};

export default MeesageDropDown;
