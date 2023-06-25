import { Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../../../redux/hooks';

const IsOnline = () => {
  const { online, isTyping } = useAppSelector((state) => state.activeChatSlice);

  return <>{online && !isTyping && <Text fontSize="12px">En linea</Text>}</>;
};

export default IsOnline;
