import { Text } from '@chakra-ui/react';
import { messageUI } from '../../../../../../types/message/message';
import { ChatMessages } from '..';

interface Props {
  msg: messageUI;
  isOutgoing: boolean;
  showDate: boolean;
}
const ChatMessage = ({ msg, isOutgoing, showDate }: Props) => {
  const { message } = msg;

  return (
    <ChatMessages.Provider
      msg={msg}
      isOutgoing={isOutgoing}
      showDate={showDate}
    >
      <ChatMessages.ShowDate />

      <ChatMessages.Container>
        <ChatMessages.DropDownOptions />
        <Text>{message}</Text>
        <ChatMessages.Status />
      </ChatMessages.Container>
    </ChatMessages.Provider>
  );
};

export default ChatMessage;
