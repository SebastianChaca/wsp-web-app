import { Box, Flex } from '@chakra-ui/react';
import { messageUI } from '../../../../../../types/message/message';
import {
  Provider,
  MessageDate,
  ResponseToMessage,
  DropDownOptions,
  Container,
  ErrorIcon,
  Status,
  MessageText,
  IconReaction,
} from './components';

interface Props {
  msg: messageUI;
  isOutgoing: boolean;
  showDate: boolean;
  isLastElement: boolean;
}
const ChatMessage = ({ msg, isOutgoing, showDate, isLastElement }: Props) => {
  const hasIcon = msg.iconReactions && msg.iconReactions.length > 0;
  return (
    <Provider msg={msg} isOutgoing={isOutgoing} showDate={showDate}>
      <Box
        overflow="hidden"
        h={hasIcon ? '85px' : '100%'}
        mb={isLastElement ? '5px' : '0px'}
      >
        <MessageDate />

        <Container>
          <ResponseToMessage />
          <DropDownOptions />
          <Flex alignItems="end">
            <MessageText />
            <Status />
          </Flex>
          <IconReaction msg={msg} />
        </Container>
        <ErrorIcon />
      </Box>
    </Provider>
  );
};

export default ChatMessage;
