import { MenuItem } from '@chakra-ui/react';

interface Props {
  onOpen(): void;
}
function AddFriend({ onOpen }: Props) {
  return (
    <>
      <MenuItem onClick={onOpen}>AddFriend</MenuItem>
    </>
  );
}

export default AddFriend;
