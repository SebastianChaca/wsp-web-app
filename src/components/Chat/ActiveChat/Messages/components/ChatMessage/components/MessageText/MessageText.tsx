import { Text } from '@chakra-ui/react';
import { useMessageContext } from '../Provider/MessageProvider';

const MessageText = () => {
  const { msg } = useMessageContext();

  if (!msg.message) {
    return null;
  }

  return (
    <Text
      p="2px 10px 5px 5px"
      color={msg.isLoading || msg.hasFailed ? 'blackAlpha.300' : 'black'}
    >
      {msg.message}
    </Text>
  );
};

export default MessageText;
