import { Box, Flex } from '@chakra-ui/react';

interface Props {
  children?: JSX.Element | JSX.Element[];
  isOutgoing: boolean;
}
const ChatMessageContainer = ({ children, isOutgoing }: Props) => {
  return (
    <Flex w="100%" justifyContent={isOutgoing ? 'right' : 'left'}>
      <Box
        py="8px"
        px="16px"
        verticalAlign="top"
        bg={isOutgoing ? '#7674FE' : 'gray.400'}
        color={isOutgoing ? '#ffff' : '#646464'}
        borderRadius="3px"
        w="auto"
        my="10px"
        wordBreak="break-all"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default ChatMessageContainer;
