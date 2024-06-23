import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { CloseButton as Close } from '@chakra-ui/react';
import { setResponseTo } from '../../../../redux/activeChat/activeChatSlice';

const CloseButton: FC = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setResponseTo(null));
  };
  return <Close onClick={handleClose} size="32px" />;
};

export default CloseButton;
