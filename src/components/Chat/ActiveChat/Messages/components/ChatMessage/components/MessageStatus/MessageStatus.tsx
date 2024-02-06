import { Flex } from '@chakra-ui/react';
import { MessageCheck, MessageHour } from './components';
import { useMessageContext } from '../Provider/MessageProvider';

const MessageStatus = () => {
  const { isOutgoing, msg } = useMessageContext();

  return (
    <Flex justifyContent="right">
      <MessageHour date={msg.date} />
      <MessageCheck isOutgoing={isOutgoing} seen={msg.seen} />
    </Flex>
  );
};

export default MessageStatus;
