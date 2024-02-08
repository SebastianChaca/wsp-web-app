import { ReactNode, useState, useEffect } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { useAppSelector } from '../../../../../redux/hooks';

interface PopOverTypes {
  children: ReactNode;
  menuIsOpen: boolean;
}
const AddFriendPopover = ({ children, menuIsOpen }: PopOverTypes) => {
  const { friends, friendsLoading } = useAppSelector(
    (state) => state.friendsSlice
  );
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    if (!friendsLoading) {
      setShowPopover(friends.length === 0);
    }
  }, [friends, friendsLoading]);

  useEffect(() => {
    if (showPopover && menuIsOpen) {
      setShowPopover(false);
    }
  }, [menuIsOpen, showPopover]);

  if (friendsLoading) {
    return null;
  }
  return (
    <Popover isOpen={showPopover}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton
          onClick={() => {
            setShowPopover(false);
          }}
        />
        <PopoverBody>Add your first friend !</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AddFriendPopover;
