import React, { FC, useState } from 'react';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/all';
import { createPortal } from 'react-dom';
import { useChatMessagesContext } from '../ChatMessageProvider';

const ChatMeesageDropDown: FC = () => {
  const { isOutgoing, showDropDown, setShowDropDown } =
    useChatMessagesContext();

  if (isOutgoing) {
    return null;
  }
  return (
    <Menu isLazy>
      {showDropDown && (
        <MenuButton
          position="absolute"
          top={-2}
          right={0}
          _hover={{ bg: 'none' }}
          _active={{ bg: 'none' }}
          as={IconButton}
          rightIcon={<BiChevronDown size={20} />}
          variant="ghost"
        />
      )}
      <MenuList
        onMouseEnter={() => setShowDropDown(true)}
        position="absolute"
        top={-5}
        left={5}
      >
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
      ,
    </Menu>
  );
};

export default ChatMeesageDropDown;
