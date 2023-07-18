import { FC } from 'react';
import { GrClose } from 'react-icons/all';
import { useDispatch } from 'react-redux';
import { IconButton } from '@chakra-ui/react';
import { setResponseTo } from '../../../../../../../../redux/activeChat/activeChatSlice';

const CloseButton: FC = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setResponseTo(null));
  };
  return (
    <IconButton
      onClick={handleClose}
      aria-label=""
      icon={<GrClose />}
      bg="transparent"
      _hover={{ bg: 'brand.gray2' }}
    />
  );
};

export default CloseButton;
