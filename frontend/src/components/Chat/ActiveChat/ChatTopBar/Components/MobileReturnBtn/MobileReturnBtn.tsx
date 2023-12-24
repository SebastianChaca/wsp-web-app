import React from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { IconButton } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { resetActiveChatState } from '../../../../../../redux/activeChat/activeChatSlice';
import { resetMessageState } from '../../../../../../redux/messages/messagesSlice';
import { resetSelectedFriendId } from '../../../../../../redux/friends/friendsSlice';

const MobileReturnBtn = () => {
  const { isMobile } = useAppSelector((state) => state.uiSlice);
  const dispatch = useAppDispatch();
  return (
    <>
      {isMobile && (
        <IconButton
          ml="8px"
          aria-label="Go back"
          icon={<IoArrowBackSharp />}
          onClick={() => {
            dispatch(resetActiveChatState());
            dispatch(resetMessageState());
            dispatch(resetSelectedFriendId());
          }}
        />
      )}
    </>
  );
};

export default MobileReturnBtn;
