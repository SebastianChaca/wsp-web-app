import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useChatMessagesContext } from '../ChatMessageProvider';

interface Props {
  children?: ReactNode;
}
const ChatMessageContainer = ({ children }: Props) => {
  const { isOutgoing, setShowDropDown } = useChatMessagesContext();
  return (
    <Flex w="100%" justifyContent={isOutgoing ? 'right' : 'left'}>
      <Box
        py="8px"
        px="16px"
        verticalAlign="top"
        bg={isOutgoing ? 'message.out.bg' : 'message.in.bg'}
        color={isOutgoing ? 'message.out.color' : 'message.in.color'}
        borderRadius="3px"
        w="auto"
        my="10px"
        wordBreak="break-all"
        position="relative"
        overflow="hidden"
        onMouseEnter={() => setShowDropDown(true)}
        onMouseLeave={() => setShowDropDown(false)}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default ChatMessageContainer;
