import { FC } from 'react';
import { Text, Flex, Box } from '@chakra-ui/react';
import { useChatMessagesContext } from '../Provider/MessageProvider';

const ChatMessageShowDate: FC = () => {
  const { showDate, msg } = useChatMessagesContext();

  if (showDate) {
    return (
      <Flex justifyContent="center" my="5px">
        <Box borderRadius="8px" backgroundColor="brand.gray" p="5px">
          <Text fontSize="12">{msg.parseDate}</Text>
        </Box>
      </Flex>
    );
  }
  return null;
};

export default ChatMessageShowDate;
