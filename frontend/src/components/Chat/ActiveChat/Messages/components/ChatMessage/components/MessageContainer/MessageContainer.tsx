import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useMessageContext } from '../Provider/MessageProvider';

interface Props {
  children?: ReactNode;
}
const MessageContainer = ({ children }: Props) => {
  const { isOutgoing, setShowDropDown, msg, hasIconReaction } =
    useMessageContext();
  const getBackgroundColor = () => {
    if (msg.isLoading || msg.hasFailed) {
      return 'blackAlpha.100';
    }
    if (isOutgoing) {
      return 'message.out.bg';
    }
    return 'message.in.bg';
  };

  // const getColor = () => {
  //   if (msg.isLoading) {
  //     return 'red';
  //   }
  //   if (isOutgoing) {
  //     return 'message.out.color';
  //   }
  //   return 'message.in.color';
  // };
  return (
    <Box
      p="4px"
      verticalAlign="top"
      bg={getBackgroundColor()}
      borderRadius="3px"
      w="auto"
      my={hasIconReaction ? '20px' : '10px'}
      wordBreak="break-all"
      onMouseEnter={() => setShowDropDown(true)}
      onMouseLeave={() => setShowDropDown(false)}
      position="relative"
    >
      {children}
    </Box>
  );
};

export default MessageContainer;
