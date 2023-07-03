import { Text, Flex, Box } from '@chakra-ui/react';
import MessageStatus from '../MessageStatus/MessageStatus';
import { messageUI } from '../../../../../types/message/message';
import { ChatMessageContainer } from './components';

interface Props {
  msg: messageUI;
  isOutgoing: boolean;
  showDate: boolean;
}
const ChatMessage = ({ msg, isOutgoing, showDate }: Props) => {
  const { message } = msg;

  return (
    <>
      {showDate && (
        <Flex justifyContent="center" my="5px">
          <Box borderRadius="8px" backgroundColor="brand.gray" p="5px">
            <Text fontSize="12">{msg.parseDate}</Text>
          </Box>
        </Flex>
      )}
      <ChatMessageContainer isOutgoing={isOutgoing}>
        <Text>{message}</Text>
        <MessageStatus
          isOutgoing={isOutgoing}
          date={msg.date}
          seen={msg.seen}
        />
      </ChatMessageContainer>
    </>
  );
};

export default ChatMessage;
