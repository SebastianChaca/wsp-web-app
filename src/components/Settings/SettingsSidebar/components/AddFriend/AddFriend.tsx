import { IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { MdOutlinePersonAddAlt } from 'react-icons/md';

import AddFriendPopover from './AddFriendPopover';
import AddFriendModal from './AddFriendModal/AddFriendModal';

export const AddFriend = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <>
      <AddFriendModal isOpen={isOpen} onClose={onClose} />
      <AddFriendPopover>
        <IconButton
          icon={<MdOutlinePersonAddAlt size="35px" />}
          aria-label="add-friend"
          margin="8px"
          padding="10px"
          bg="transparent"
          onClick={onOpen}
        />
      </AddFriendPopover>
    </>
  );
};
