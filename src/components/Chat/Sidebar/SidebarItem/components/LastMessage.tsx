import { Flex, Text } from '@chakra-ui/react';
import { MessageCheck } from '../../../ActiveChat/Messages/components/ChatMessage/components/MessageStatus/components';
import { useSideBarContext } from './SideBarProvider';
import { PhotoIcon } from '../../../../Ui';

const LastMessage = () => {
  const { friend, session } = useSideBarContext();

  const isOutgoing = friend.lastMessage.from === session.uid;
  const { lastMessage, isTyping } = friend;

  if (lastMessage && !isTyping) {
    return (
      <Flex alignItems="center" mt="5px" w="100%">
        <MessageCheck
          isOutgoing={isOutgoing}
          seen={lastMessage?.seen}
          onSideBar
        />
        {lastMessage.image && <PhotoIcon />}
        <Text fontSize="12px" ml="5px" noOfLines={1} w="80%">
          {lastMessage.image ? 'Photo' : lastMessage?.message}
        </Text>
      </Flex>
    );
  }
  return null;
};

export default LastMessage;
