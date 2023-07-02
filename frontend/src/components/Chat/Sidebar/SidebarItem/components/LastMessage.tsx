import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { messageUI } from '../../../../../types/message/message';
import { MessageCheck } from '../../../ActiveChat/Messages/MessageStatus/components';

interface LastMessageProps {
  lastMessage: messageUI;
  isOutgoing: boolean;
}

const LastMessage: FC<LastMessageProps> = ({ lastMessage, isOutgoing }) => {
  return (
    <Flex alignItems="center" mt="5px">
      <MessageCheck isOutgoing={isOutgoing} seen={lastMessage.seen} onSideBar />
      <Text fontSize="12px" ml="5px">
        {lastMessage.message}
      </Text>
    </Flex>
  );
};

export default LastMessage;
