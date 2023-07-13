import { Flex } from '@chakra-ui/react';
import { MessageCheck, MessageHour } from './components';
import { useChatMessagesContext } from '../ChatMessage/components/ChatMessageProvider';

const MessageStatus = () => {
  const { isOutgoing, msg } = useChatMessagesContext();

  return (
    <Flex justifyContent="right">
      <MessageHour date={msg.date} />
      <MessageCheck isOutgoing={isOutgoing} seen={msg.seen} />
    </Flex>
  );
};

export default MessageStatus;
