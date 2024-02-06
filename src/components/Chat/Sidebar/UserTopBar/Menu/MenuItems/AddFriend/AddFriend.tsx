import { MenuItem } from '@chakra-ui/react';

interface Props {
  onOpen(): void;
}
const AddFriend = ({ onOpen }: Props) => {
  return (
    <>
      <MenuItem onClick={onOpen}>Add Friend</MenuItem>
    </>
  );
};

export default AddFriend;
