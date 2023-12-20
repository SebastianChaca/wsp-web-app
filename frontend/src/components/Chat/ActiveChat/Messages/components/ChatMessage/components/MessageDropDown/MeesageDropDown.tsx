import React, { FC } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useMessageContext } from '../Provider/MessageProvider';
import { setResponseTo } from '../../../../../../../../redux/activeChat/activeChatSlice';

const MeesageDropDown: FC = () => {
  const { isOutgoing, showDropDown, setShowDropDown, activeChat, msg } =
    useMessageContext();
  const dispatch = useDispatch();
  const handleSetMessageResponse = () => {
    dispatch(setResponseTo(msg));
  };
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
              top={0}
              right={0}
              borderRadius="3px"
              h="15px"
              bg="message.in.bg"
              _hover={{ bg: 'message.in.bg' }}
              border="1px solid gray"
              // _active={{
              //   bg: 'message.in.bg',
              //   h: '10px',
              // }}
              as={IconButton}
              icon={<BiChevronDown size={15} />}
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
                <MenuItem onClick={handleSetMessageResponse}>
                  Responder
                </MenuItem>
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
