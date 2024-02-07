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
  const { friends } = useAppSelector((state) => state.friendsSlice);
  const [showPopover, setShowPopover] = useState(friends.length === 0);

  useEffect(() => {
    if (showPopover && menuIsOpen) {
      setShowPopover(false);
    }
  }, [menuIsOpen, showPopover]);
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
        {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
        <PopoverBody>Add your frist friend !</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AddFriendPopover;
