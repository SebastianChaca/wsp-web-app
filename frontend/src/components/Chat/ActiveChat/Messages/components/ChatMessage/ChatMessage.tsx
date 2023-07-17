import { Text } from '@chakra-ui/react';
import { messageUI } from '../../../../../../types/message/message';
import { Message } from '..';

interface Props {
  msg: messageUI;
  isOutgoing: boolean;
  showDate: boolean;
}
const ChatMessage = ({ msg, isOutgoing, showDate }: Props) => {
  const { message } = msg;

  return (
    <Message.Provider msg={msg} isOutgoing={isOutgoing} showDate={showDate}>
      <Message.Date />

      <Message.Container>
        <Message.DropDownOptions />
        <Text>{message}</Text>
        <Message.Status />
      </Message.Container>
    </Message.Provider>
  );
};

export default ChatMessage;
