import { Flex } from '@chakra-ui/react';
import { messageUI } from '../../../../../../types/message/message';
import { Message } from '..';

interface Props {
  msg: messageUI;
  isOutgoing: boolean;
  showDate: boolean;
}
const ChatMessage = ({ msg, isOutgoing, showDate }: Props) => {
  return (
    <Message.Provider msg={msg} isOutgoing={isOutgoing} showDate={showDate}>
      <Message.Date />
      <Flex alignItems="center">
        <Message.Container>
          <Message.ResponseToMessage />
          <Message.DropDownOptions />
          <Flex alignItems="end">
            <Message.MessageText />
            <Message.Status />
          </Flex>
        </Message.Container>
        <Message.ErrorIcon />
      </Flex>
    </Message.Provider>
  );
};

export default ChatMessage;
