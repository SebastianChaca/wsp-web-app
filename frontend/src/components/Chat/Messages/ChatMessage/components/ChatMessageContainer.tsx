import { Box, Flex } from '@chakra-ui/react';

interface Props {
  children?: JSX.Element | JSX.Element[];
  isOutgoing: boolean;
}
const ChatMessageContainer = ({ children, isOutgoing }: Props) => {
  return (
    <Flex w="100%" justifyContent={isOutgoing ? 'right' : 'left'}>
      <Box
        padding=" 10px"
        verticalAlign="top"
        bg={isOutgoing ? '#7674FE' : 'gray.400'}
        color={isOutgoing ? '#ffff' : '#646464'}
        borderRadius="3px"
        w="40%"
        my="10px"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default ChatMessageContainer;
