import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { messageUI } from '../../../../../types/message/message';
import { MessageCheck } from '../../../ActiveChat/Messages/components/ChatMessage/components/MessageStatus/components';

interface LastMessageProps {
  lastMessage: messageUI;
  isOutgoing: boolean;
}

const LastMessage: FC<LastMessageProps> = ({ lastMessage, isOutgoing }) => {
  if (lastMessage) {
    return (
      <Flex alignItems="center" mt="5px">
        <MessageCheck
          isOutgoing={isOutgoing}
          seen={lastMessage?.seen}
          onSideBar
        />
        <Text fontSize="12px" ml="5px" noOfLines={1} maxW="90px">
          {lastMessage?.message}
        </Text>
      </Flex>
    );
  }
  return <Flex my="15px" />;
};

export default LastMessage;
