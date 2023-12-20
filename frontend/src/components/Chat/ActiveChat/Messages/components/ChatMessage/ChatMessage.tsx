import { Flex } from '@chakra-ui/react';
import { messageUI } from '../../../../../../types/message/message';
import {
  Provider,
  MessageDate,
  ResponseToMessage,
  DropDownOptions,
  MessageContainer,
  ErrorIcon,
  Status,
  MessageText,
  IconReaction,
  MainContainer,
  IconReactionDropDown,
} from './components';

interface Props {
  msg: messageUI;
  isOutgoing: boolean;
  showDate: boolean;
  isLastElement: boolean;
}
const ChatMessage = ({ msg, isOutgoing, showDate, isLastElement }: Props) => {
  return (
    <Provider
      msg={msg}
      isOutgoing={isOutgoing}
      showDate={showDate}
      isLastElement={isLastElement}
    >
      <MainContainer>
        <MessageDate />

        <MessageContainer>
          <ResponseToMessage />
          <DropDownOptions />
          <Flex alignItems="end">
            <MessageText />
            <Status />
          </Flex>
          <IconReaction />
        </MessageContainer>
        <IconReactionDropDown />

        <ErrorIcon />
      </MainContainer>
    </Provider>
  );
};

export default ChatMessage;
