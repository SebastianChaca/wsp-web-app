import { Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../../../redux/hooks';

const IsOnline = () => {
  const { activeChat } = useAppSelector((state) => state.chatSlice);
  const { online, isTyping } = activeChat;

  return <>{online && !isTyping && <Text fontSize="12px">En linea</Text>}</>;
};

export default IsOnline;
