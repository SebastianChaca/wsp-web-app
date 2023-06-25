import React from 'react';
import { Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../../../redux/hooks';

const IsTyping = () => {
  const { isTyping } = useAppSelector((state) => state.activeChatSlice);

  return <>{isTyping && <Text fontSize="12px">Escribiendo...</Text>}</>;
};

export default IsTyping;
