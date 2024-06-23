import { Flex, Text, Box } from '@chakra-ui/react';
import { MdPhotoCamera } from 'react-icons/md';
import { MessageCheck } from '../../../ActiveChat/Messages/components/ChatMessage/components/MessageStatus/components';
import { useSideBarContext } from './SideBarProvider';

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
        {lastMessage.image && (
          <Box marginLeft="4px" color="black">
            <MdPhotoCamera size="20px" />
          </Box>
        )}
        <Text fontSize="12px" ml="5px" noOfLines={1} w="80%">
          {lastMessage.image ? 'Photo' : lastMessage?.message}
        </Text>
      </Flex>
    );
  }
  return null;
};

export default LastMessage;
