import React from 'react';
import { Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../../../redux/hooks';
import { getLastActive } from '../../../../../utils/date';

const LastActive = () => {
  const { online, lastActive } = useAppSelector(
    (state) => state.activeChatSlice
  );

  return (
    <>
      {!online && lastActive && (
        <Text fontSize="12px">{getLastActive(lastActive)}</Text>
      )}
    </>
  );
};

export default LastActive;
