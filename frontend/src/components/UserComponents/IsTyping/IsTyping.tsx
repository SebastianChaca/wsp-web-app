import { FC } from 'react';
import { Text } from '@chakra-ui/react';

interface IsTypingProps {
  isTyping: boolean | undefined;
}

const IsTyping: FC<IsTypingProps> = ({ isTyping }) => {
  if (isTyping) {
    return <Text fontSize="12px">Escribiendo...</Text>;
  }
  return null;
};

export default IsTyping;
