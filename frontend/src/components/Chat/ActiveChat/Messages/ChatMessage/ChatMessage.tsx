import { Text } from '@chakra-ui/react';
import MessageStatus from '../MessageStatus/MessageStatus';
import { messageUI } from '../../../../../types/message/message';
import { ChatMessageContainer } from './components';

interface Props {
  msg: messageUI;
  isOutgoing: boolean;
}
const ChatMessage = ({ msg, isOutgoing }: Props) => {
  const { message } = msg;

  return (
    <ChatMessageContainer isOutgoing={isOutgoing}>
      <Text>{message}</Text>
      <MessageStatus isOutgoing={isOutgoing} date={msg.date} seen={msg.seen} />
    </ChatMessageContainer>
  );
};

export default ChatMessage;
