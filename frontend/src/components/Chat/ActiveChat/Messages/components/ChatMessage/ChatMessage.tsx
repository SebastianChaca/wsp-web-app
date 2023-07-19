import { Text, Flex } from '@chakra-ui/react';
import { messageUI } from '../../../../../../types/message/message';
import { Message } from '..';
import { ResponseTo } from '../../../../../Ui';

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
        {msg.responseTo && (
          <ResponseTo.Container>
            <ResponseTo.Decoration />
            <ResponseTo.Message message={msg.responseTo} />
          </ResponseTo.Container>
        )}
        <Message.DropDownOptions />
        <Flex alignItems="end">
          <Text p="2px 10px 5px 5px" color="black">
            {message}
          </Text>
          <Message.Status />
        </Flex>
      </Message.Container>
    </Message.Provider>
  );
};

export default ChatMessage;
