import React from 'react';
import { Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../../redux/hooks';

const IsTyping = () => {
  const { activeChat } = useAppSelector((state) => state.chatSlice);
  const { isTyping } = activeChat;
  return <>{isTyping && <Text fontSize="12px">Escribiendo...</Text>}</>;
};

export default IsTyping;
