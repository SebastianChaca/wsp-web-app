import React from 'react';
import { Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../../redux/hooks';
import { getLastActive } from '../../../../utils/date';

const LastActive = () => {
  const { activeChat } = useAppSelector((state) => state.chatSlice);
  const { online, lastActive } = activeChat;
  return (
    <>
      {!online && lastActive && (
        <Text fontSize="12px">{getLastActive(lastActive)}</Text>
      )}
    </>
  );
};

export default LastActive;
