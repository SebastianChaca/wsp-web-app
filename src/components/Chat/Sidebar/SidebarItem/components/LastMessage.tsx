import { Flex, Text } from '@chakra-ui/react';
import { MessageCheck } from '../../../ActiveChat/Messages/components/ChatMessage/components/MessageStatus/components';
import { useSideBarContext } from './SideBarProvider';

const LastMessage = () => {
  const { friend, session } = useSideBarContext();

  const isOutgoing = friend.lastMessage.from === session.uid;
  const { lastMessage, isTyping } = friend;
  if (lastMessage && !isTyping) {
    return (
      <Flex alignItems="center" mt="5px">
        <MessageCheck
          isOutgoing={isOutgoing}
          seen={lastMessage?.seen}
          onSideBar
        />
        <Text fontSize="12px" ml="5px" noOfLines={1} w="100px">
          {lastMessage?.message}
        </Text>
      </Flex>
    );
  }
  return null;
};

export default LastMessage;
